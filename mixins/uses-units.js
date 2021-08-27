var usesUnits = {
  props: {
    units: {type:String}
  },
  data: function () {
    return {
      cnv: this.$store.conversions,
    }
  },
  computed: {
    unit: function() {
      this.units_array = this.units.split(",")
      return this.units_array[Math.floor(Math.random()*this.units_array.length)]
    },
    suffix: function() {return "\\(" + this.process_text(this.unit) + "\\)"},
    conversion: function() {
      this.str[this.name+"_conversion"]=this.cnv[this.unit]/this.cnv[this.units_array[0]]
      return this.cnv[this.unit]/this.cnv[this.units_array[0]]
    },
    final_value: function () {
      let value = this.str[this.name]
      this.str[this.name+"_converted"]= Number((this.str[this.name]*this.conversion).toPrecision(this.sig))
      return "\\("+this.str[this.name+"_converted"] +"\\) \ "+this.suffix
    }
  },
  methods: {
    process_text: function(text) {
      let new_text = text
      if (text.includes("/")) {
        let pieces = text.split("/")
        let pieces1 = this.process_text(pieces[0])
        pieces.shift()
        let pieces2 = this.process_text(pieces.join())
        new_text = "\\frac{"+pieces1+"}{"+pieces2+"}"
      }
      return new_text
    }
  }
}
