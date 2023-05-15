import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload';
import store from "../src/store/store";
import './plugins/analytics';
import './plugins/meta';

Vue.config.productionTip = false


Vue.use(VueLazyload, {
  loading: require('../src/assets/loading.gif'), // Placeholder image while the actual image is loading
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')