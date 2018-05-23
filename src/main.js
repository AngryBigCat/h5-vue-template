// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false;

let apiAddress = document.querySelector("meta[name='api-address']").getAttribute('content');
Vue.prototype.$axios = axios.create({
	baseURL: apiAddress + '/api/',
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
