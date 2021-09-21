#!/usr/bin/env node

const { program } = require('commander');
const create = require('../lib/init');
const onList = require('../lib/onList');
const onAdd = require('../lib/onAdd');
const onDel = require('../lib/onDel');


// 读取 packgaejson
const packageConfig = require('../package.json');
// 这样输出-V或--version就能看到版本号了
program.version(packageConfig.version);

// 初始化模板
program.command('init').description('初始化项目模板').action(create);

// 查看模板
program.command('ls').description('查看当前所有模板').action(onList);

// 添加模板
program
  .command('add')
  .description(
    '本地添加模板, direct:域名:所有者/项目名称#分支 例如 direct:http://gitlab.szy.net/fed/antd-vue-template.git#feature/1.x'
  )
  .action(onAdd);

// 移除模板
program.command('del <name>').description('移除本地模板').action(onDel);



program.parse(process.argv);
