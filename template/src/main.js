// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {
  Col, Row, Menu,
  Submenu, Dropdown, DropdownMenu,
  DropdownItem,
  Message, MessageBox, Notification,
} from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import VueAuth from '@websanova/vue-auth';
import AuthDriver from '@websanova/vue-auth/drivers/auth/basic';
import RouterDriver from '@websanova/vue-auth/drivers/router/vue-router.2.x';
import HttpDriver from '@websanova/vue-auth/drivers/http/vue-resource.1.x';

import App from './App';
import router from './router';
import './i18n';

import API from './api';


Vue.use(Vuex);
Vue.use(Col);
Vue.use(Row);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);

Vue.prototype.$locale = {
  change(lang) {
    Vue.config.lang = lang;
  },
  current() {
    return Vue.config.lang;
  },
};

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$notify = Notification;

Vue.prototype.$api = API;

Vue.use(VueResource);
Vue.http.options.root = '';  // like: http://xx.xx.xx.xx
Vue.config.lang = localStorage.getItem('EAGLEWOOD_LANGUAGE') || 'en';
Vue.router = router;

const authOptions = {
  auth: AuthDriver,
  http: HttpDriver,
  router: RouterDriver,
  rolesVar: 'role',
  tokenName: 'token',
  authRedirect: { path: '/login' },
  forbiddenRedirect: { name: 'list' },
  notFoundRedirect: { path: '/' },
  registerData: null,
  loginData: { url: '/api/auth/login', method: 'POST', redirect: '/file/list', fetchUser: true },
  logoutData: { url: '/api/auth/logout', method: 'GET', redirect: '/login', makeRequest: false },
  fetchData: { url: '/api/auth/user', method: 'GET', enabled: true },
  refreshData: { url: '/api/auth/refresh', method: 'GET', enabled: false },
};
// register auth
Vue.use(VueAuth, authOptions);

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
});
