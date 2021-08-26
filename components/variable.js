var Variable = Vue.extend({
  props: {
    name: {type: String},
  },
  mixins: [usesNumbers,usesUnits],
  data: function () {
    return {
      str: this.$store[this.$parent.name]
    }
  },
  template: `<span>{{final_value}}</span>`
})
