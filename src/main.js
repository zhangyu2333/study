import './common/js/flexible.js';
import Vue from 'vue';
import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router';
import store from './store/index';
Vue.use(MintUI)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
