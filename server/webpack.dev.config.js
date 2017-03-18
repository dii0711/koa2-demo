// 开发环境

var merge = require('webpack-merge') // merge 合并插件
var webpack = require('webpack')
var baseWebpackConfig = require('./webpack.base.config'); // 引入base配置

module.exports = merge(baseWebpackConfig, {

  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
})