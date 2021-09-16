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
      full_score: 1
    }
  },
  mixins: [blankUsesNumbers,blankUsesUnits],
  computed: {
    score: function () {
      if (this.last_score != this.full_score*this.modifier) {
        this.str["score"]-=this.last_score
        this.str["score"]+= this.modifier*this.full_score
        this.last_score = this.full_score*this.modifier
      }
      return this.last_score
    }
  },
  methods: {
    dockPoints: function() {
      if (!this.correct().includes("Correct!") && this.full_score-this.penalty>0) {
        this.full_score -= this.penalty
      }
    },
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
      v-on:blur='dockPoints'
      v-model=answer
      :success-messages='correct()'
      :suffix='suffix'
      :rules='[errors]'
      validate-on-blur>
      <template v-slot:label>
        {{capitalize(name)}}
        <v-progress-circular v-if="score!=0" :value='score*100' :size="15" :width="1"/>
      </template>
    </v-text-field>
  `

})
