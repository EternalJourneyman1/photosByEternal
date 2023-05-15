import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "../src/store/store";
import './plugins/analytics';
import './plugins/meta';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')