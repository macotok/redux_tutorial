const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('css/[name].css');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    entry: {
      app: ['./client/src/js/app.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
    },
    devServer: {
      contentBase: './dist',
      watchContentBase: true,
      port: 3000,
      open: true,
    },
    module: {
      loaders: [
        {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'env'],
          },
        },
      ],
    },
    devtool: 'eval-source-map',
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new HtmlWebpackPlugin({
        template: __dirname + '/client/src/index.html',
      }),
    ],
  },
  {
    entry: {
      style: ['./client/src/sass/style.scss'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'css/[name].css',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: extractSass.extract({
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            }, {
              loader: 'sass-loader?outputStyle=compressed',
            }],
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [
      extractSass,
    ],
  },
];
