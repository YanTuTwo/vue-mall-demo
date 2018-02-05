import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
Vue.use(MuseUI);

Vue.config.productionTip = false


//价格过滤器
Vue.filter('priceTofixed', function (value) {
  if (!value) return ''
  value = Number(value);
  return value.toFixed(2);
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
