/*
 * @Description:
 * @Version: 2.0
 * @Autor: Yaowen Liu
 * @Date: 2021-04-27 17:00:12
 * @LastEditors: Yaowen Liu
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/page-login/PageLogin'),
    meta: {
      title: '登陆'
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('views/layout/Layout'),
    children: [
      {
        path: '/',
        redirect: 'pageExample'
      },
      {
        path: 'pageExample',
        name: 'pageExample',
        component: () => import('views/page-example/PageExample'),
        meta: {
          title: '页面模板'
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
