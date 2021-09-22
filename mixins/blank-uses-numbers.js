var blankUsesNumbers  = {

  data: function () {
    return {
      str: this.$store[this.$parent.name],
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
        this.success_message=["Correct!"]
        return true
      } else {
        this.success_message=[]
        return false
      }
    },
    number_errors: function(value) {
      let cval = this.final_answer
      if (this.correct()) {
        return [true, 1]
      }
      else if (value=="") {return ["Required", 0]}
      else if ((cval<this.min && cval>this.min*.9) || (cval>this.max && cval<this.max*1.1)) {
        return ["Close!",0.5]
      }
      else if (cval<this.min || cval>this.max) {
        return ["Incorrect", 0]
      }
      else {return [true, 1]}
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
