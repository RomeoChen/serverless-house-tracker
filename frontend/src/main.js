import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style/app.css';
import router from './router'
import store from './store'

Vue.config.productionTip = false;

Vue.use(Antd);

/** 开发环境 */
window.env = {}
window.env.apiUrl = 'https://service-g9p31ojq-1257634896.gz.apigw.tencentcs.com/release/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
