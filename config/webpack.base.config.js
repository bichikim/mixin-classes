/* tslint:disable:no-require-imports */
const path = require('path')
const formatter = require('eslint-friendly-formatter')

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

const tsConfigFile = process.env.TS_CONFIG_FILE || 'tsconfig.json'
const tsTranspileOnly = process.env.TS_TRANSPILE_ONLY === 'true'
const srcPath = process.env.SRC || 'src'
// noinspection JSUnusedGlobalSymbols
module.exports = {
  target: 'node',
  entry: {
    app: ['./src/index.ts'],
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    pathinfo: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      '@': resolve('src'),
      '~': resolve('lib'),
      '@@': resolve('./'),
      '~~': resolve('./'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|ts|vue)/,
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter,
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              import: [resolve(srcPath, 'styles/index.styl')],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|ico|eot|woff|woff2|ttf)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          publicPath: './dist/',
          limit: 10000,
        },
      },
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['pug-loader'],
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: tsTranspileOnly,
              configFile: tsConfigFile,
            },
          },
        ],
      },
    ],
  },
}
