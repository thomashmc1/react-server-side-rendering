var path = require('path')
var webpack = require('webpack')
var webpackConfig = {}

//app entry point
webpackConfig.entry = [
  'webpack-dev-server/client?http://127.0.0.1:8080/',
  'webpack/hot/only-dev-server',
  './client'
]

//app output path and name
webpackConfig.output = {
  path: path.join(__dirname, '/dist'),
  filename: 'bundle.js'
}


webpackConfig.resolve = {
  modulesDirectories: ['node_modules', 'client'],
  extensions: ['', '.js', '.jsx']
}

webpackConfig.module = {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }
  ]
}

webpackConfig.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]

webpackConfig.devtool = 'inline-source-map'

webpackConfig.devServer = {
  hot: true,
  proxy: {
    '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
  },
  host: '127.0.0.1'
}

module.exports = webpackConfig
