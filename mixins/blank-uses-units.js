var blankUsesUnits = {
  mixins: [usesUnits],
  created: function() {
    this.error_functions.push("unit_errors")
  },
  computed: {
    final_answer: function() {
      return this.answer/this.conversion
    },
  },
  methods: {
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
    unit_errors: function(value) {
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
        if (this.final_answer>min && this.final_answer<max) {
          this.modifier = 0.75
          return this.error_message(set)
        } else if ((this.answer>min && this.answer<max) && this.conversion!=1) {
          this.modifier = 0.9
          set.push(this.name)
          return this.error_message(set)
        }
      }
      return true

    },
  }
}
