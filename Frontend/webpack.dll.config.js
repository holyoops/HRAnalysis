const webpack = require('webpack');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

const vendors = [
  'react',
  'react-dom',
  'react-router',
  'react-addons-css-transition-group',
  'recharts'
];

module.exports = {
  output: {
    path:path.join(__dirname, 'dist'),
    filename: 'require.dll.js',
    library: 'require',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: 'require',
      context: __dirname,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CleanPlugin('dist')
  ],
};
