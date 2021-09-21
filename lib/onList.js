const chalk = require('chalk');
const { getAllTemplates } = require('../utils');

function onList() {
  const allRegistries = getAllTemplates();
  Object.keys(allRegistries).forEach((key) => {
    console.log(chalk.blue(`${key}（${allRegistries[key].name}）`));
  });
}

module.exports = () => {
  onList();
};
