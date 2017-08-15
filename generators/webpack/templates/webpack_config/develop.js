/**
 * 开发环境配置
 * @author Cc
 * 说明：1、暂不配置热替换（Hot Module Replacement）。如果设置了，要在入口文件内调用 module.hot 来监听相关模块。
 * 
 */

var Webpack = require('webpack');
var Path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var BaseWebpackConfig = require('./webpack.config.js');
var Merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// var autoprefixer = require('autoprefixer');
var hostPort = 8080;

// 添加开发环境的webpack配置
var webpackConfig = Merge(BaseWebpackConfig, {
  // 定义出口目录
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         plugins: function () {
      //           return [autoprefixer({ browsers: ["> 1%","last 2 versions","not ie <= 8"] })];
      //         }
      //       }
      //     },
      //     'sass-loader'
      //   ]
      // }

    ]
  },
  plugins: [
    // 这里 http://0.0.0.0:8080/index.html 访问的是由webpack生成的页面，修改该页面依据的模板即可触发自动刷新
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../app/src/tmpl/demo.html'), //依据的模板
      filename: 'index.html', //生成的html的文件名
      inject: true, //注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
    }),

    // 打包模块分析
    new BundleAnalyzerPlugin({
      analyzerHost: '0.0.0.0',
      analyzerPort: 8888,
      openAnalyzer: false
    }),

    // 热替换插件
    // new Webpack.HotModuleReplacementPlugin(),

    // 标记替换的模块时用模块本身的名称显示
    // new Webpack.NamedModulesPlugin(),

    // new Webpack.NoEmitOnErrorsPlugin(), //不触发错误,即编译后运行的包正常运行
  ]
})

// 入口文件添加自动刷新、热替换配置
// webpackConfig.entry.main.unshift("webpack/hot/dev-server", "webpack-dev-server/client?http://0.0.0.0:8080/");
// 入口文件添加自动刷新
webpackConfig.entry.main.unshift("webpack-dev-server/client?http://0.0.0.0:" + hostPort + "/");
var compiler = Webpack(webpackConfig);

//开启服务
var server = new WebpackDevServer(compiler, {
  // 指定服务器访问目录，这里 http://0.0.0.0:8080/tmpl/demo.html 访问的是非webpack生成的页面，修改该页面不会触发自动刷新
  contentBase: "./app/src",

  // 后台日志文字颜色开关
  stats: {
    colors: true
  },
});

server.listen(hostPort, "0.0.0.0", function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at 0.0.0.0:' + hostPort + '...');
});