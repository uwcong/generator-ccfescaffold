/**
 * 基础环境配置
 * @author Cc
 * 
 */

var Webpack = require('webpack');
var Path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
var htmlMetas = {
  charset: 'utf-8',
  httpEquiv: 'X-UA-Compatible',
  httpEquivContent: 'IE=edge',
  viewport: 'viewport',
  viewportContent: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  formatDetection: 'format-detection',
  formatDetectionContent: 'telephone=no'
}

module.exports = {
  entry: {
    main: [Path.resolve(__dirname, '../app/src/js/main.js')], // 定义入口文件
  },
  resolve: { // resolve 指定可以被 import 的文件后缀
    extensions: [' ', '.js', 'jsx']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: 'images/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    // new CommonsChunkPlugin({name: 'vendor', filenames: })

    // 调用多次生成多个HTML文件
    // 这里 http://0.0.0.0:8080/index.html 访问的是由webpack通过模板文件生成的页面
    new HtmlWebpackPlugin({
      title: 'Demo',
      template: Path.resolve(__dirname, '../app/src/tmpl/demo.html'), //依据的模板
      filename: 'index.html', //生成的html的文件名
      inject: true, //注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
      // chunks: string[], // 设置包含的chunk 
      // excludeChunks: string[], // 设置不包含的chunk
      charset: htmlMetas.charset,
      httpEquiv: htmlMetas.httpEquiv,
      httpEquivContent: htmlMetas.httpEquivContent,
      viewport: htmlMetas.viewport,
      viewportContent: htmlMetas.viewportContent,
      formatDetection: htmlMetas.formatDetection,
      formatDetectionContent: htmlMetas.formatDetectionContent
    }),
  ]
}