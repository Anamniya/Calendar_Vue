import Vue from 'vue'
import App from './App.vue'

// Vue.config.productionTip = false;

// var eventBus = new Vue();
export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')



