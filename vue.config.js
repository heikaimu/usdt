/*
 * @Description:
 * @Version: 2.0
 * @Autor: Yaowen Liu
 * @Date: 2020-03-23 17:40:43
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-06-23 11:14:36
 */
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'assets',
  lintOnSave: false,
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
      .set('comp', resolve('src/components'))
      .set('api', resolve('src/api'));
  },

  devServer: {

  },

  css: {
    // 预加载CSS
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/common/style/variables.scss";
          @import "~@/common/style/mixins.scss";
        `
      }
    }
  }
};
