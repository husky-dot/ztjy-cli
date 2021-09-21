const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');

const { getAllTemplates } = require('../utils');
const cusRegs = require('../json/customregist.json');

function onAdd(name, url) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'key',
        message: `请输入项目名称(对应 ${chalk.yellow(
          'package.json'
        )} 中的 ${chalk.yellow('name')})`,
      },
      {
        type: 'input',
        name: 'name',
        message: '请输入项目描述',
      },
      {
        type: 'input',
        name: 'downUrl',
        message: `请输入项目下载地址，${chalk.red(
          '格式：direct:域名:所有者/项目名称#分支'
        )}`,
      },
    ])
    .then((answers) => {
      const { key, name, downUrl } = answers
      if (!key) {
        console.log(chalk.bgRed('项目名称不能为空'));
        return
      }
      if (!name) {
        console.log(chalk.bgRed('项目描述不能为空'));
        return
      }
      if (!downUrl) {
        console.log(chalk.bgRed('项目下载地址不能为空'));
        return
      }
      let tmpAll = getAllTemplates();
      if (tmpAll.hasOwnProperty(name)) {
        console.log(chalk.bgRed(name + ' 已经被使用'));
        return;
      }
      // 添加
      let tmp = {};
      tmp[key] = {
        name,
        downUrl
      }
      let result = { ...tmp, ...cusRegs };
      const cliPath = path.join(__dirname, '/../json/customregist.json');
      fs.writeFileSync(cliPath, JSON.stringify(result, null, '\t'));
      console.log(chalk.green(`成功写入,输入 ${chalk.yellow('ztjy-cli ls')} 查看最新template`));
    });
}

module.exports = (name, url) => {
  onAdd(name, url);
};
