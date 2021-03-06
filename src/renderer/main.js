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

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import { languages, defaultLocale } from './translations/index.js';
const messages = Object.assign(languages);

let i18n = new VueI18n({
	locale: defaultLocale,
	fallbackLocale: 'en',
	messages
});


//Database Initializer
import { settings, cache, downloads } from './datastore';

Vue.prototype.$db = {
	settings,
	cache,
    downloads
}; //just use this.$db to access it
Vue.prototype.$db.settings.load(); //load settings table

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
	i18n,
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

/*
 * Need to get some ideas/ways to have better performance in the app
 *      https://github.com/randyou/snail/tree/master/src/renderer
 *      https://github.com/lukakerr/BitStream
 */