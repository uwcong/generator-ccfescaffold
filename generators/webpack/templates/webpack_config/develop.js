/**
 * 开发环境配置
 * @author Cc
 * 说明：1、暂不配置js的热替换（Hot Module Replacement）。如果设置了，要在入口文件内调用 module.hot 来监听相关模块。
 *
 */

var Webpack = require('webpack');
var Path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var Merge = require('webpack-merge');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CommonConfig = require('./webpack.config.js');
var hostPort = 8180;

// 添加开发环境的webpack配置
var webpackConfig = Merge(CommonConfig, {
  // 定义出口目录
  output: {
    filename: 'js/[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 样式内嵌
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // 打包模块分析
    new BundleAnalyzerPlugin({analyzerHost: '0.0.0.0', analyzerPort: 8888, openAnalyzer: false}),

    // 热替换插件
    new Webpack.HotModuleReplacementPlugin(),

    // 标记替换的模块时用模块本身的名称显示
    new Webpack.NamedModulesPlugin(),

    // new Webpack.NoEmitOnErrorsPlugin(), //不触发错误,即编译后运行的包正常运行
  ]
});

// 入口文件添加自动刷新、热替换配置
webpackConfig
  .entry
  .main
  .unshift("webpack-dev-server/client?http://0.0.0.0:" + hostPort + "/", "webpack/hot/dev-server");

var compiler = Webpack(webpackConfig);

//开启服务
var server = new WebpackDevServer(compiler, {
  // react-router相关，设置Clean URLs with Browser
  // History（https://github.com/reactjs/react-router-tutorial/tree/master/lessons/1
  // 0-clean-urls）
  historyApiFallback: true,

  // 指定服务器访问目录，这里 http://0.0.0.0:8180/tmpl/demo.html 访问的是模板页面
  contentBase: "./app/src",

  // 热替换配置
  hot: true,
  inline: true,

  // 后台日志文字颜色开关
  stats: {
    colors: true
  },

  // 反向代理api设置
  proxy: [
    {
      context: ["/femock"],
      target: "http://192.168.3.14:3000", //需要代理的域名
      changeOrigin: true //必须配置为true，才能正确代理
    }
  ]
});

server.listen(hostPort, "0.0.0.0", function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at 0.0.0.0:' + hostPort + '...');
});