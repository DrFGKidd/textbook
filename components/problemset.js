var ProblemSet = Vue.extend({
  props: {
    problemkey: {
      type: String,
      required: true,
    },
    number: {
      type: [String, Number],
      default: "all"
    },
    random: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      all_problems: this.$store.problemsets[this.problemkey]
    }
  },
  computed: {
    problems: function() {
      let probs = this.all_problems
      if (this.random) {
        probs = this.shuffle(probs)
      }
      if (!isNaN(this.number)) {
        console.log(probs.length)
        let num = Math.min(this.number,probs.length)
        probs = probs.slice(0,num)
      }
      return probs
    }
  },
  methods: {
    shuffle: function(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
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
