const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devConfig = {
  mode: 'production',
  entry: {
    // 👇 对应渲染进程的 app.jsx 入口文件
    index: path.resolve(__dirname, '../app/renderer/app.tsx'),
    setting: path.resolve(__dirname, '../app/renderer/windowPages/setting/app.tsx'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    // 这里就需要 jsx 和 tsx 了
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // 别名配置，在 Electron 中并未用到别名路径，所以拆到 React 这边的配置中
    alias: {
      '@assets': path.join(__dirname, '../', 'assets/'),
      '@src': path.join(__dirname, '../', 'app/renderer'),
      '@common': path.join(__dirname, '../', 'app/renderer/common'),
    },
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      // 👇 以此文件为模版，自动生成 HTML
      template: path.resolve(__dirname, '../app/renderer/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/renderer/windowPages/setting/index.html'),
      filename: path.resolve(__dirname, '../dist/setting.html'),
      chunks: ['setting'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../assets'),
          to: path.resolve(__dirname, '../dist/assets'),
        },
        {
          from: path.resolve(__dirname, '../appConfig'),
          to: path.resolve(__dirname, '../dist/appConfig'),
        },
      ],
    }),
  ],
};

module.exports = webpackMerge.merge(baseConfig, devConfig);
