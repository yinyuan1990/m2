/*
 * @Autor: lh
 * @Date: 2023-01-06 11:03:20
 * @LastEditors: lh
 * @LastEditTime: 2023-01-06 17:40:17
 * @Description: 
 */
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

// const { ProvidePlugin } = require('webpack');
module.exports = defineConfig({
  publicPath: './',
  outputDir: 'dist',
  assetsDir: '/static',
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        // zlib: ['zlib', 'Zlib']
      })
      // new ProvidePlugin({
      //   Buffer: ['buffer', 'Buffer']  // 自动注入Buffer
      // })
    ]
  }
})
