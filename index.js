//For Vue 3
//const app = Vue.createApp({})
//app.component('problem0', {
//numbers out of range, what to do if in wrong order?
//For Vue 2
//import  App  from './App.vue'
httpVueLoader.register(Vue, './App.vue')

const store = Vue.observable({
  conversions: {'N':1,'lb_f':.225,'m/s^2':1,'ft/s^2':3.28, 'kg':1, "Pa":1, "atm":0.00000987},
})
Vue.prototype.$store = store

//Vue 2
new Vue({
  el:"#app",
  template: '<App/>',
  vuetify: new Vuetify(),
  components: { App }
})

//Vue 3
//app.mount("#app")
