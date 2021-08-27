var varUsesNumbers = {
  props: {
    max: [Number, String],
    min: [Number, String],
  },
  created: function() {
    let max = parseInt(this.max,10)
    let min = parseInt(this.min,10)
    this.str[this.name] = Math.random()*(max-min)+min
  },
  computed: {
    sig: function() {
      return Math.max(this.max.toString().replace(".","").length,this.min.toString().replace(".","").length)
    },
    final_value: function() { return this.str[this.name]}
  }
}
