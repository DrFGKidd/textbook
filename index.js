//For Vue 3
//const app = Vue.createApp({})
//app.component('problem0', {
//For Vue 2






function updateText() {
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
Vue.prototype.$updateText=updateText
//Vue 2
var app = new Vue({
  el:"#app",
  vuetify: new Vuetify(),
  components: {
    Variable,
    Blank,
    Hint,
    Problem,
    ProblemSet,
    Quiz
  },

})
//Vue 3
//app.mount("#app")
