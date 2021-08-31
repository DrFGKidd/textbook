var Word = Vue.extend({
  props: {
    name: {type: String},
  },
  mixins: [varUsesWords],
  data: function () {
    return {
      str: this.$store[this.$parent.name]
    }
  },
  template: `<span>{{final_value}}</span>`
})
