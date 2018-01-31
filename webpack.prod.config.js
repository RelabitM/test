const path = require('path');
const webpack = require('webpack');
const sourcePath = path.join(__dirname, './src');

const vendorModules = require('./vendorModules');

module.exports = {
  entry: {
    app: ['./src/index.jsx'],
    app_vend: vendorModules
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|)$/,
        loader: 'file-loader',
        options: {
          name: '/resources/[name].[ext]',
          publicPath: '/Clients/Front'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app_vend'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
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
    path: __dirname + '/prod',
    filename: '[name].js',
    publicPath: '/'
  }
};
