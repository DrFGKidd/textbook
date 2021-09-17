var Blank = Vue.extend({
  props: {
    name: {type: String},
    tol: [Number, String],
    expression: {type: String},
    penalty: {
      default: 0.1,
    }
  },
  mounted: function() {
    this.str["blanks"]+=1
    this.str["max_score"]+=this.full_score
  },
  data: function() {
    return {
      answer: "",
      error_functions: [],
      last_score: 0,
      full_score: 1+this.penalty,
      modifier: 0,
      success_message: []
    }
  },
  mixins: [blankUsesNumbers,blankUsesUnits],
  methods: {
    updateScore: function() {
      if (!this.correct()) {
        if (this.full_score-this.penalty>0) {
          this.full_score -= this.penalty
        } else (this.full_score = 0)
      } else if (this.correct() && this.full_score>1) {this.full_score=1}
      this.errors(this.answer)
      this.$emit('update',-this.last_score+this.full_score*this.modifier)
      this.last_score = this.full_score*this.modifier
    },
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    errors: function(value) {
      for (i in this.error_functions) {
        let err_func = this[this.error_functions[i]]
        if (err_func(value)[0] != true) {
          this.modifier = err_func(value)[1]
          return err_func(value)[0]
        }
      }
      if (this.correct()) {this.modifier = 1}
      return true
    }
  },
  template: `
    <v-text-field dense class='d-inline-block'
      v-model=answer
      :success-messages='success_message'
      :suffix='suffix'
      :rules='[errors]'
      v-on:blur='updateScore()'
      validate-on-blur>
      <template v-slot:label>
        {{capitalize(name)}}
        <v-progress-circular :value='last_score*100' :size="15" :width="1"/>
      </template>
    </v-text-field>
  `

})
