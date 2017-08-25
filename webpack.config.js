const path = require('path')
const config = require('./config')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors'
  }),
  new ExtractTextPlugin({
    filename: 'css/[name].css',
    disable: false
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
]
var entryProd = {
  vendors: [
    'react',
    'react-dom'
  ],
  app: path.join(__dirname, './src/layout'),
  global: path.join(__dirname, 'src/css/global.less'),
  home: path.join(__dirname, 'src/css/home.less'),
  about: path.join(__dirname, 'src/css/about.less')
}
var entryDev = {
  app: path.join(__dirname, './src/layout'),
  global: path.join(__dirname, 'src/css/global.less')
}

var outputProd = {
  filename: 'js/[name].js',
  path: path.join(__dirname, 'dist')
}
var outputDev = {
  filename: 'js/[name].js',
  path: path.join(__dirname, 'dist')
}

var isProd = process.env.NODE_ENV === 'production' // true or false

var cssDev = ['style-loader', 'css-loader', 'less-loader']
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'less-loader'],
  publicPath: '/dist'
})

var cssConfig = isProd ? cssProd : cssDev
var entry = isProd ? entryProd : entryDev
var output = isProd ? outputProd : outputDev

if (!isProd) {
  var views = new CopyWebpackPlugin([
    { from: 'views/dev-index.ejs', to: 'index.html', toType: 'file' }
  ])
  plugins.splice(0, 1)
  plugins.push(views)
}

module.exports = {
  entry,
  output,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: config.port,
    stats: 'errors-only',
    hot: true,
    open: true,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: 'file-loader?name=assets/images/[name].[ext]'
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.ejs$/, exclude: /node_modules/, loader: 'ejs-loader?variable=data' },
      {
        test: /\.less$/,
        use: cssConfig
      }
    ]
  },
  plugins,
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  }
}
