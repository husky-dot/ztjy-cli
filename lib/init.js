const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const shell = require('shelljs');
const download = require('download-git-repo');
const registries = require('../json/registries.json');



const spinner = ora(chalk.green('下载中...'));

const cwd = process.cwd();
// 版本号正则
const versionReg = /^([0-9]\d|[0-9])(\.([0-9]\d|\d)){2}$/;

// 验证输入的合法性
const validateInput = (answers) => {
  if (!answers.projectName) {
    console.log(chalk.bgRed('项目名称不能为空！'));
    return false;
  }
  if (!versionReg.test(answers.version)) {
    console.log(
      chalk.red(
        '请填写正确的版本号：格式(x.x.x) 其中 x 必须为数字，最多两位数：如 0.0.1 或 0.0.11'
      )
    );
    return false;
  }
  return true;
};

async function create() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'projectTemplate',
        message: '请选择项目模板?',
        choices: [
          'antd-vue-template',
          'antd-vue-admin-template',
          'github-antd-vue-template',
          'github-antd-vue-admin-template',
        ],
      },
      {
        type: 'input',
        name: 'projectName',
        message: '请填写项目名称',
      },
      {
        type: 'input',
        name: 'version',
        message: '请填写项目版本',
      },
    ])
    .then((answers) => {
      // 验证输入的合法性
      if (validateInput(answers)) {
        // 获取当前路径
        const targetDir = path.resolve(cwd, answers.projectName || '.');
        // 判断当前路径下是否有这个文件夹
        if (!fs.existsSync(targetDir)) {
          const { projectTemplate } = answers;
          if (projectTemplate === 'antd-vue-template' || projectTemplate === 'antd-vue-admin-template') {
            copyTemplate(answers)
          } else {
            downloadGitRepo(answers);
          }
        } else {
          console.log(chalk.bgRed('当前路径已存在同名目录，请确定后再试'));
        }
      }
    });
}
/**
 * 下载 git 仓库
 * @param {项目名} projectName
 */
function downloadGitRepo(answers) {
  const { projectTemplate, projectName, version } = answers;
  console.log(chalk.blue('正在拉取' + projectTemplate + '项目模板'));
  spinner.start();
  download(
    registries[projectTemplate].downUrl,
    projectName,
    { clone: true },
    function (err) {
      if (err) {
        // 下载失败
        spinner.fail(chalk.bgRed('下载失败'));
      } else {
        // 下载成功
        // 获取当前路径
        const targetDir = path.resolve(cwd, answers.projectName || '.');
        const packagePath = `${targetDir}/package.json`;
        const packageContent = fs.readFileSync(packagePath, 'utf8');
        const packageResult = handlebars.compile(packageContent)({
          version,
          name: projectName,
        });
        fs.writeFileSync(packagePath, packageResult);
        spinner.succeed(chalk.bgGreen('下载成功'));
      }
    }
  );
}

const copyTemplate = (answers) => {
  spinner.start('初始化中...');
  const { projectTemplate, projectName, version } = answers;
  // 获取当前路径
  const templatePath = path.resolve(cwd, `./template/${projectTemplate}`);
  const newTemplateJsonPath = path.resolve(cwd, `./${projectName}/package.json`);
  const newTemplatePath = path.resolve(cwd, `./${projectName}`);
  shell.cp('-R', templatePath, newTemplatePath)
  const packageContent = fs.readFileSync(newTemplateJsonPath, 'utf8');
  const packageResult = handlebars.compile(packageContent)({
    version,
    name: projectName,
  });
  fs.writeFileSync(newTemplateJsonPath, packageResult);
  spinner.succeed(chalk.bgGreen('初始化成功'));
}
module.exports = (...args) => {
  return create(...args).catch((err) => {
    console.log(symbols.error, chalk.red(err));
    process.exit(1);
  });
};
