var webpack = require('webpack');
var path = require('path');
var webpackDevServer = require('webpack-dev-server');
var baseWebpackConfig = require('./webpack.config.js');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var autoprefixer = require('autoprefixer');

// 添加开发环境的webpack配置
var webpackConfig = merge(baseWebpackConfig, {
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
    // new Webpack.DefinePlugin({
    //   "process.env": {
    //     "NODE_ENV": JSON.stringify("development")
    //   }
    // }),

    // 这里 http://localhost:8080/index.html 访问的是由webpack生成的页面，修改该页面依据的模板即可触发自动刷新或热替换
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/src/tmpl/demo.html'), //依据的模板
      filename: 'index.html', //生成的html的文件名
      inject: true, //注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
    }),
    // new webpack.HotModuleReplacementPlugin(), //热替换插件
    // new webpack.NoEmitOnErrorsPlugin(), //不触发错误,即编译后运行的包正常运行
  ]
})

// 入口文件添加自动刷新、热替换配置
// webpackConfig.entry.main.unshift("webpack/hot/dev-server", "webpack-dev-server/client?http://localhost:8080/");
webpackConfig.entry.main.unshift("webpack-dev-server/client?http://localhost:8080/");
var compiler = webpack(webpackConfig);

//开启服务
var server = new webpackDevServer(compiler, {
  // historyApiFallback: true,
  // hot: true,
  // inline: true,

  // 后台日志文字颜色开关
  stats: {
    colors: true
  },

  // 指定服务器访问目录，这里 http://localhost:8080/tmpl/demo.html 访问的是非webpack生成的页面，修改该页面不会触发自动刷新或热替换
  contentBase: "./app/src"
});


server.listen(8080, "localhost", function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:8080...');
});