const path = require('path');
const webpack = require('webpack');
const sourcePath = path.join(__dirname, './src');
const vendorModules = require('./vendorModules');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/index.jsx'
    ],
    vendor: vendorModules
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|sass|scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.(jpg|png|)$/,
        loader: 'file-loader',
        options: {
          name: '/resources/[name].[ext]',
          publicPath: '../'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        TEST: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ]
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    publicPath: "/dist"
  }
};