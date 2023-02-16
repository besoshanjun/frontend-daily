const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MyPlugin = require('../plugin/index');

module.exports = {
  mode: 'development',
  entry: [path.resolve(__dirname, '../src/main.js'), path.resolve(__dirname, '../src/header.js')],
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
  },
  devServer: {
    port: 3003,
  },
  watch: true,
  module: {
    rules: [
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: 'webpack1210',
      chunks: ['main'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'header.html',
      title: 'webpack1210-header',
      chunks: ['header'],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[hash:4].css',
      chunkFilename: '[id].css',
    }),
    new MyPlugin(),
  ],
};
