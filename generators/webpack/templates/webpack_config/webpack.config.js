var Webpack = require('webpack');
var Path = require('path');
var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;

module.exports = {
  entry: {
    main: [Path.resolve(__dirname, '../app/src/js/main.js')], // 定义入口文件
  },
  output: { // 定义出口目录
    // path: path.resolve(__dirname, '../app/src'),
    // filename: '[name].js',
    // publicPath: './'
    // filename: '[name].js',
    // publicPath: '/abb/'
  },
  resolve: { // resolve 指定可以被 import 的文件后缀
    extensions: ['.js']
  },
  // devtool: 'source-map',
  module: {
    rules: [{
        test: /\.js[x]?$/,
        use: 'babel-loader',
        include: Path.resolve(__dirname, '../app/src/js')
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: Path.posix.join(config.build.assetsSubDirectory, 'img/[name].[hash:7].[ext]'),
      //   }
      // }
    ]
  },
  plugins: [

    // new CommonsChunkPlugin({name: 'vendor', filenames: })
  ]
}