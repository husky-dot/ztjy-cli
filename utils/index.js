
const customregist = require('../json/customregist.json');
const registries = require('../json/registries.json');

/**
 * 获取所有template
 */
function getAllTemplates() {
  let all = {
    ...registries,
    ...customregist,
  };
  return all;
}

module.exports = {
  getAllTemplates
}