const path = require('path')

// 解决  resolve is not defined  问题
// 地址： https://segmentfault.com/q/1010000014960196
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 只有在 CI 下才采用 OSS 地址
  publicPath:
    process.env.NODE_ENV === 'production' && !!process.env.GITLAB_TRIGGER
      ? process.env.PUBLIC_PATH
      : '/',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    port: 8902,
  },
  chainWebpack(config) {
    config.module
      .rule('tsx')
      .test(/\.tsx$/)
      .use(['babel-loader', '@ant-design-vue/vue-jsx-hot-loader'])
      .before('babel-loader')
      .loader('@ant-design-vue/vue-jsx-hot-loader')

    config.devtool(process.env.NODE_ENV === 'development' ? 'eval' : false)
    config.when(process.env.VUE_APP_ENV === 'mock', (config) => {
      config.devServer.before((app) => {
        const mockerAPI = require('mocker-api')
        mockerAPI(app, path.resolve(__dirname, './mock/index.js'), {})
      })
    })

    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks({
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
          asyncCommon: {
            name: 'chunk-async-common',
            test: /\.(css|less)$/,
            priority: 10,
            chunks: 'async',
            minChunks: 2,
            minSize: 0,
            reuseExistingChunk: true,
          },
        },
      })
    }
  },
}
