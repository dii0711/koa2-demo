const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  // 入口文件
  entry: {
    'admin' : './static/src/pages/admin.js',
    'work' : './static/src/pages/work.js',
    'index' : './static/src/pages/index.js',
    'error' : './static/src/pages/error.js',
    vendor: ['react', 'react-dom', 'whatwg-fetch'],
  },

  // 出口文件
  output: {
    path: path.resolve(__dirname, 'src'), // webpack2中必须使用绝对路径
    filename: '[name].[hash].js',
  }

  module: {
    // 配置编译打包规则
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, 		// 排除node_modules目录
        use: [
          {
            loader: 'babel-loader',		// webpack2中必须使用完整的loader
            query: {					// 在.babelrc文件中写入 { "presets": ['es2015', 'react'] }
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader']
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']	// 按使用的顺序从右往左
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'less-loader']
        })
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath,
      'node_modules'
    ]
  },

  // 所用的插件
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
      filename: 'js/[name].js'
    }),
  ]
};

// 为了方便编译基本配置代码统一管理，开发环境（wepack.dev.config.js）和生产环境（webpack.prod.config.js）的编译配置都是继承了基本配置（wepack.base.config.js）的代码

