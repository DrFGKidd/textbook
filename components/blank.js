var Blank = Vue.extend({
  props: {
    name: {type: String},
    tol: [Number, String],
    expression: {type: String},
  },
  mounted: function() {test=this},
  data: function() {
    return {
      answer: "",
      error_functions: [],
    }
  },
  mixins: [blankUsesNumbers,blankUsesUnits],
  methods: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    errors: function(value) {
      for (i in this.error_functions) {
        let err_func = this[this.error_functions[i]]
        if (err_func(value) != true) {return err_func(value)}
      }
      return true
    }
  },
  template: `
    <v-text-field dense class='d-inline-block'
      :label='capitalize(name)'
      v-model=answer
      :success-messages='correct()'
      :suffix='suffix'
      :rules='[errors]'
      validate-on-blur>
    </v-text-field>
  `

})
