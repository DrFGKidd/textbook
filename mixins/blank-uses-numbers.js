var blankUsesNumbers  = {

  data: function () {
    return {
      str: this.$store[this.$parent.name],
      modifier: 0,
    }
  },
  mounted: function() {
    this.error_functions.push("number_errors")
    this.str[this.name]=eval(this.new_exp())
    this.min=this.str[this.name]*(1-this.tol)
    this.max=this.str[this.name]*(1+this.tol)
  },
  methods:  {
    correct: function() {
      if (this.final_answer>this.min && this.final_answer<this.max) {
        return ["Correct!"]
      } else {
        return []
      }
    },
    number_errors: function(value) {
      let cval = this.final_answer
      if (this.correct().includes("Correct!")) {
        this.modifier = 1
        return true
      }
      else if (value=="") {return "Required"}
      else if ((cval<this.min && cval>this.min*.9) || (cval>this.max && cval<this.max*1.1)) {
        this.modifier = 0.5
        return "Close!"
      }
      else if (cval<this.min || cval>this.max) {
        this.modifier = 0
        return "Incorrect"}
      else {return true}
    },
    new_exp: function() {
      let n_exp = this.expression
      for (key in this.str) {
        if (n_exp.includes(key)) {n_exp = n_exp.replace(key,"this.str."+key)}
      }
      return n_exp
    },
  }
}
