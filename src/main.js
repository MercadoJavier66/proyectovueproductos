import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const ruta = location.href
		if(
		ruta.indexOf('login') == -1 && ruta.indexOf('registro') == -1 &&
		localStorage.getItem('usuario') == null
		) location.href = '/login'

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
