Vue.component('number_variable', {
  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    units: {
      type: Array,
    }
  },
  computed: {
    unit: () => this.units[Math.floor(Math.random()*this.units.length)] || "",
    decimals: () => Math.max(this.countDecimals(this.max),this.countDecimals(this.min)),
    value: () => (Math.random()*(this.max-this.min)+this.min).toFixed(this.decimals),
    converted_value: () => this.value*this.conversions[this.unit]/this.conversions[this.units[0]] || this.value,
    show: () => {
      items = this.unit.split("/")
      if (!!items[1]) {return "\\("+this.converted_value+"\\ \\frac{"+items[0]+"}{"+items[1]+"}\\)"}
      else {return "\\("+this.converted_value+" \\ "+unit+"\\)"}
    },
  },
  methods: {
    countDecimals: function (number) {
      if(Math.floor(number) === number) return 0;
      return number.toString().split(".")[1].length || 0;
    },
  },
}
