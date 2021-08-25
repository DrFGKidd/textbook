//For Vue 3
//const app = Vue.createApp({})
//app.component('problem0', {
//numbers out of range, what to do if in wrong order?
//For Vue 2
const store = Vue.observable({
  conversions: {'N':1,'lb_f':.225,'m/s^2':1,'ft/s^2':3.28, 'kg':1, "Pa":1, "atm":0.00000987},
})
Vue.prototype.$store = store



var Variable = Vue.extend({
  props: {
    name: {type: String},
    max: [Number, String],
    min: [Number, String],
    units: {type: String},
  },
  data: function () {
    return {
      cnv: this.$store.conversions,
      str: this.$store[this.$parent.name]
    }
  },
  computed: {
    unit: function() {
      this.units_array = this.units.split(",")
      return this.units_array[Math.floor(Math.random()*this.units_array.length)]},
    conversion: function() {
      this.str[this.name+"_conversion"]=this.cnv[this.unit]/this.cnv[this.units_array[0]]
      return this.cnv[this.unit]/this.cnv[this.units_array[0]]
    },
    sig: function() {
      return Math.max(this.max.toString().replace(".","").length,this.min.toString().replace(".","").length)
    },
    var_value: function() {
      let max = parseInt(this.max,10)
      let min = parseInt(this.min,10)
      this.str[this.name] = Math.random()*(max-min)+min
      this.str[this.name+"_converted"]= Number((this.str[this.name]*this.conversion).toPrecision(this.sig))
      return this.str[this.name+"_converted"]
    },
  },
  template: `<span>\\( {{var_value}} \\ {{unit}} \\)</span>`
})

var Blank = Variable.extend({
  props: {
    expression: {type: String},
    tol: [Number, String],
  },
  data: function () {
    return {
      answer: "",
    }
  },
  mounted: function() {
    this.str[this.name]=eval(this.new_exp())
  },
  computed: {
    conv_answer: function() {
      this.str[this.name]=this.answer
      this.str[this.name+"_key"]=this.answer/this.conversion
      return this.str[this.name+"_key"]
    },
    suffix: function() {return "\\(" + this.unit + "\\)"},
  },
  methods: {
    correct: function() {
      let ans = this.answer/this.conversion
      if (ans>this.min_val() && ans<this.max_val()) {
        return ["Correct!"]
      } else {
        return []
      }
    },
    new_exp: function() {
      let n_exp = this.expression
      for (key in this.str) {
        if (n_exp.includes(key)) {n_exp = n_exp.replace(key,"this.str."+key)}
      }
      return n_exp
    },
    max_val: function() {return this.value()*(1+this.tol)},
    min_val: function() {return this.value()*(1-this.tol)},
    value: function() {
      try {
        this.str[this.name]=eval(this.new_exp())
        return eval(this.new_exp())
      } catch (error) {
        this.str[this.name]=1
        return 1
      }},
    errors: function(value) {
      let cval = this.conv_answer
      if (this.correct().includes("Correct!")) {return true}
      else if (value=="") {return "Required"}
      else if (this.conversion != 1 && (value>this.min_val() && value<this.max_val())) {
        return "Convert your " + this.str.name
      }
      else if ((cval<this.min_val() && cval>this.min_val()*.9) || (cval>this.max_val() && cval<this.max_val()*1.1)) {return "Close!"}
      else if (cval<this.min_val() || cval>this.max_val()) {return "Incorrect"}
      else {return true}
    },
    combinations: function(array) {
      return new Array(1 << array.length).fill().map((e1, i) => array.filter((e2, j) => i & 1 << j));
    },
    error_message: function(array) {
      let l = array.length
      if (l==1) {
        return "You forgot to convert the "+array[0]
      } else if (l==2) {
        return ("You forgot to convert the "+array).replace(","," and ")
      } else if (l==3) {
          let text = ("You forgot to convert the "+array).replace(",",", ")
          var t=0;
          text = text.replace(/,/g, function (match) {
            t++;
            return (t === 2) ? " and" : match;
          });
        return text
      } else if (l>3) {
        return "Check your conversions!"
      } else {
        return true
      }
    },
    common_errors: function(value) {
      let vars = []
      let exp = this.new_exp()
      for (key in this.str) {
        if (exp.includes(key) && (this.str[key+"_conversion"]!=1)){
          vars.push(key)
        }
      }
      sets = this.combinations(vars)
      for (i in sets) {
        let set = sets[i]
        let exp = this.new_exp()
        for (j in set) {exp = exp.replace(set[j],set[j]+"_converted")}
        let val = 1
        try {
          val = eval(exp)
        } catch (error) { val = 1}
        let min = val*(1-this.tol)
        let max = val*(1+this.tol)
        if (this.conv_answer>min && this.conv_answer<max) {
          return this.error_message(set)
        } else if ((this.answer>min && this.answer<max) && this.conversion!=1) {
          set.push(this.name)
          return this.error_message(set)
        }
      }
      return true

    },
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  template: `
    <v-text-field dense class='d-inline-block'
      :label='capitalize(name)'
      v-model=answer
      :success-messages='correct()'
      :suffix='suffix'
      :rules='[common_errors,errors]'
      validate-on-blur>
    </v-text-field>
  `

})
var Hint = Vue.extend({
  data: function() {
    return {
      id: this.$parent.id
    }
  },
  props: {
    number: {type: String},
    text:   {type: String},
  },
  components: {
    Variable,
    Blank,
  },
  methods: {
    process: function(text) {
      return "This is processed: "+text
    },
    parseText: function(text) {
      let elements = []
    }
  },
  render: function (createElement) {
    return createElement("variable",
    {
        props: {
          name: "pressure",
          max: 500000,
          min: 200000,
          units: "Pa,atm"
        }
      }
      )
  }
})
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
