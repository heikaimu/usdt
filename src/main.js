/*
 * @Description:
 * @Version: 2.0
 * @Autor: Yaowen Liu
 * @Date: 2021-04-27 17:00:12
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-01-19 16:02:12
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/common/style/index.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import EventBus from './common/lib/bus';
import VueLazyload from 'vue-lazyload';
import components from '@/components';

const LOADING_IMG = require('@/assets/loading_w.jpg');
const ERROR_IMG = require('@/assets/image_error.jpg');
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: ERROR_IMG,
  loading: LOADING_IMG,
  attempt: 1
});

Vue.use(ElementUI);
Vue.use(EventBus);
Vue.use(components);

Vue.prototype.$EventBus = EventBus;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
