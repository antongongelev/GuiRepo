import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import axios from 'axios';
import ClientsTable from "./components/ClientsTable";


Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  render: function (h) {
    return h(ClientsTable) }
}).$mount('#app');
