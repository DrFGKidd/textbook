//For Vue 3
//const app = Vue.createApp({})
//app.component('problem0', {
//numbers out of range, what to do if in wrong order?
//For Vue 2
const store = Vue.observable({
  conversions: {'N':1,'lb_f':.225,'m/s^2':1,'ft/s^2':3.28, 'kg':1, "Pa":1, "atm":0.00000987},
})
Vue.prototype.$store = store






var Problem = Vue.extend({
  data: function () {
    return {
  			hint_counter:0,
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  created: function () {
    this.$store[this.name]={}
    test2 = this.$store
    test = this
  },
  methods: {
    parseItem: function(text) {
      text = text.substr(1,text.length-3)
      let items = text.split(" ")
      let name = items[0]
      let props = {}
      for (let i = 1; i< items.length; i++) {
        let pieces = items[i].split("=")
        props[pieces[0]]=pieces[1]
      }
      return [name,{props}]
    },
    parseText: function () {
      let text = this.text
      let match = Array.from(this.text.matchAll("\\<(.*?)\\>"))
      for (i in match) {
        text = text.replace(match[i][0],"XYZ123"+match[i][0]+"XYZ123")
      }
      let elements = text.split("XYZ123").filter(el => {
        return el != null && el != '';
      });
      return elements
    }
  },
  components: {
    Blank,
    Variable,
    Hint
  },
  render: function(createElement) {
    let elements = this.parseText()
    for (i in elements) {
      if (elements[i].includes("<")) {
        let items = this.parseItem(elements[i])
        elements[i]=createElement(items[0],items[1])
      }
    }
    return createElement("div",{"class":"problem pa-5"},elements)
  }
})
blah = `var ProblemSet = Vue.extend({
  props: {
    problems: Array
  },
  components: {
    Problem
  },
  render: function(createElement) {
    let elements = []
    for (key in this.problems) {
      let props = {}
      props["name"]=key
      props["text"]=this.problems[key]
      elements.push(createElement("problem",{props}))
    }
    return createElement("div",elements)
  }
})`
//Vue 2
var app = new Vue({
  el:"#app",
  vuetify: new Vuetify(),
  components: {
    Variable,
    Blank,
    Hint,
    Problem
  }
})

//Vue 3
//app.mount("#app")
