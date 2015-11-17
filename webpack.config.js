var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/js/main',
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
        include: path.join(__dirname, 'src'),
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'sourcemap'
};
