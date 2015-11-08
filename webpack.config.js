var webpack = require('webpack'),
    path = require('path');

module.exports = {
  context: path.resolve('src/js'),
  entry: './main',
  resolve: {
    modulesDirectories: ['.'],
  },
  output: {
    path: path.resolve('build/js'),
    publicPath: '/public/assets/js',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'public'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      },{
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'sourcemap'
};
