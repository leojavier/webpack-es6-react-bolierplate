const path = require('path')
const config = require('./config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: [
    path.join(__dirname, './src/layout'),
    path.join(__dirname, 'src/css/main.less')
  ],
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: config.port,
    stats: 'errors-only',
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: 'file-loader?name=assets/images/[name].[ext]'
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
          publicPath: '/dist'
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Boiler-plate',
      minify: {
        collapseWhitespace: false
      },
      hash: false,
      filename: 'index.html',
      modules: true,
      template: 'src/index.html',
      chunksSortMode: 'none'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  }
}
