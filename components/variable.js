var Variable = Vue.extend({
  props: {
    name: {type: String},
  },
  mixins: [varUsesNumbers,usesUnits],
  data: function () {
    return {
      str: this.$store[this.$parent.name]
    }
  },
  template: `<span>{{final_value}}</span>`
})
