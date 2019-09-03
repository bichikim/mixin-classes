/**
 * Karma settings
 * @author Bichi Kim <bichi@live.co.kr>
 */

const webpack = require('./webpack.test.config.js')
const path = require('path')
module.exports = function (config) {
  config.set({
    basePath: '../',
    browsers: ['ChromeHeadlessWithoutSecurity'],
    frameworks: ['mocha', 'chai'],
    reporters: ['spec','coverage-istanbul'],
    files: [
      'config/karma.polyfill.js',
      {pattern: 'test/browser/**/*.spec.js', watched: false},
      {pattern: 'test/browser/**/*.spec.ts', watched: false},
      {pattern: 'test/both/**/*.spec.ts', watched: false},
      {pattern: 'test/both/**/*.spec.ts', watched: false},
    ],
    exclude: [
      'src/**/*.spec.skip.js',
    ],
    preprocessors: {
      'config/**/*.js': ['webpack'],
      'config/**/*.ts': ['webpack'],
      'src/**/*.js': ['webpack'],
      'src/**/*.ts': ['webpack'],
      'test/both/**/*.js': ['webpack'],
      'test/both/**/*.ts': ['webpack'],
      'test/browser/**/*.js': ['webpack'],
      'test/browser/**/*.ts': ['webpack'],
    },
    coverageIstanbulReporter: {
      dir: path.join(process.cwd(), 'coverage'),
      reports: ['html', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    webpack,
    webpackMiddleware: {
      noInfo: true,
    },
    logLevel: config.LOG_INFO,
    colors: true,
    customLaunchers: {
      ChromeWithoutSecurity: {
        base: 'Chrome',
        flags: ['--disable-web-security'],
      },
      ChromeHeadlessWithoutSecurity: {
        base: 'ChromeHeadless',
        flags: ['--disable-web-security'],
      },
    },
    mime: {
      'text/x-typescript': ['ts'],
    },
  })
}
