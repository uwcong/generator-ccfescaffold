/**
 * 生产环境配置
 * @author Cc
 * 
 */

var Webpack = require('webpack');
var Path = require('path');
var Merge = require('webpack-merge');
var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var rm = require('rimraf'); //node环境下rm -rf的命令库
var CommonConfig = require('./webpack.config.js');
var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;

var outputPath = Path.resolve(__dirname, '../app/dist');

// 添加开发环境的webpack配置
var webpackConfig = Merge(CommonConfig, {
  // 定义出口目录
  output: {
    path: outputPath, // 打包的根目录路径，以下的 filename 都是相对于这个目录
    filename: 'js/[name].min.js',
    publicPath: '/', // 静态资源访问路径（如果资源放在CDN也在这里统一设置）
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({ // 样式抽取
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
    ]
  },
  plugins: [
    // css抽取
    new ExtractTextPlugin({
      filename: 'css/style.css'
    }),
    
    // 混淆压缩js
    new UglifyJsPlugin({
      sourceMap: true
    }),
  ]
});

// 通过node删除旧目录，生成新目录
rm(outputPath, err => {
  if (err) throw err;

  Webpack(webpackConfig, function(err, stats) {
    if (err) throw err;

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');
    console.log(' Build complete.\n');
  })
})