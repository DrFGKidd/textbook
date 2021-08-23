Vue.component('problem%s', {
  data: function () {
    return {
  %s
        rules: {
          %s
        },
    }
  },
  computed: {
%s
  },
  methods: {
    between: function(given, ans, tolerance) {
      return (given - ans*(1-tolerance)) * (given - ans*(1+tolerance)) <= 0
    },
    correct: function(variable) {
      if(this.between(this[variable+"_answer"],this[variable],this[variable+"_tolerance"])) {return ['Correct!']} else {return []}
    }
  },
  template: `
    <div class="problem pa-5">
      %s
      <hr/>
      %s
      <v-btn elevation="2" v-on:click="hint_counter+=1"> Show Hint?</v-btn>
    </div>`,
})
