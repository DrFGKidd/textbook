var ProblemSet = Vue.extend({
  props: {
    problemkey: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      problems: this.$store.problemsets[this.problemkey]
    }
  },
  components: {
    Problem
  },
  template: `
  <div>
    <div v-for="(problem,index) in problems">
      <problem :text= 'problem' :name = 'index'/>
    </div>
  </div> `
})
