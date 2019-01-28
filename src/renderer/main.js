import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

/* App imports */
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import '@fortawesome/fontawesome-free/css/all.css'
//import '@fortawesome/fontawesome-free/js/all.js'

import db from './datastore';
Vue.prototype.$db = db; //just use this.$db to access it

import plugins from './services/api/index.js';
Vue.prototype.$plugins = plugins;
console.log(plugins);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;


window.Event = new Vue(); //Handling events between siblings and grandparent to grandsons etc...

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
