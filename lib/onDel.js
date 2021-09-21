const fs = require('fs-extra');
const path = require('path');
const registries = require('../json/registries.json');
const chalk = require('chalk');
const cusRegs = require('../json/customregist.json');

function onDel(name) {
  if (registries.hasOwnProperty(name)) {
    console.log(chalk.red(`${chalk.green(name)} 为预设定模板,不可删除`));
    return;
  } else if (!cusRegs.hasOwnProperty(name)) {
    console.log(
      chalk.red(`${chalk.green(name)} 模板不存在,请检查输入是否正确`)
    );
    return;
  }
  let newJson = {};
  Object.keys(cusRegs).forEach((key) => {
    if (key !== name) {
      newJson[key] = cusRegs[key];
    }
  });
  const cliPath = path.join(__dirname, '/../json/customregist.json');
  fs.writeFileSync(cliPath, JSON.stringify(newJson, null, '\t'));
  console.log(
    chalk.green(`成功删除,输入 ${chalk.yellow('ztjy-cli ls')} 查看最新template`)
  );
}

module.exports = (name) => {
  onDel(name);
};
