import Vue from 'vue';
import axios from 'axios';
import WebTorrent from 'webtorrent';

import App from './App';
import router from './router';
import store from './store';

/* App imports */
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import '@fortawesome/fontawesome-free/css/all.css';
//import '@fortawesome/fontawesome-free/js/all.js';


//Database Initializer
import { settings, cache, downloads } from './datastore';
Vue.prototype.$db = {
	settings,
	cache,
    downloads
}; //just use this.$db to access it

//WebTorrent Initializer
const client = new WebTorrent();
client.on('error', err => {
  if (err) console.log(err);
});
Vue.prototype.$btClient = client;

Vue.prototype.$user = {
	id: "",
	username: "SrPatinhas",
	status: "offline",
	avatar: ""
};


import plugins from './services/api/index.js';
Vue.prototype.$plugins = plugins;
console.log(plugins);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

window.Event = new Vue(); //Handling events between siblings and grandparent to grandsons etc...

/* eslint-disable no-new */
const vm = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
});
vm.$mount('#app');

window.ondragstart = () => {
  return false
};
window.ondragover = (e) => {
  e.preventDefault();
  return false;
};
window.ondragleave = (e) => {
  e.preventDefault();
  return false;
};
window.ondrop = (e) => {
  e.preventDefault();
  return false
};
window.onbeforeunload = function (e) {
  vm.$electron.ipcRenderer.send('stop-progress');
};