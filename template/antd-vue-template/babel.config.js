module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true,
      },
      'ant-design-vue',
    ],
    ['import', require('@ztjy/antd-vue/babel-plugin-import'), '@ztjy/antd-vue'],
  ],
}
