import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '@/components/404';
import Forbidden from '@/components/403';
import Login from '@/views/auth/Login';

Vue.use(VueRouter);

const root = Vue.component('root', {
  template: '<router-view></router-view>',
});

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/403',
    component: Forbidden,
    name: '403',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/',
    component: root,
    children: [],
  },
  {
    path: '*',
    redirect: { path: '/404' },
  },
];

const menuCount = routes.length;
routes[menuCount - 2].children.forEach((route) => {
  if (route.children) {
    /* eslint-disable no-param-reassign */
    if (!route.meta) route.meta = {};
    /* eslint-disable no-param-reassign */
    route.meta.children = route.children;
  }
});

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
