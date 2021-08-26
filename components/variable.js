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
