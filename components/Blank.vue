<template>
    <v-text-field dense class='d-inline-block'
      :label='capitalize(name)'
      v-model=answer
      :success-messages='correct()'
      :suffix='suffix'
      :rules='[common_errors,errors]'
      validate-on-blur>
    </v-text-field>
</template>

<script>
import Variable from './Variable.vue'

export default Variable.extend({
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
})
</script>
