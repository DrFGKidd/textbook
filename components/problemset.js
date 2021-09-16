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
      all_problems: this.$store.problemsets[this.problemkey],
      score: 0
    }
  },
  computed: {
    problems: function() {
      let probs = this.all_problems
      if (this.random) {
        probs = this.shuffle(probs)
      }
      if (!isNaN(this.number)) {
        let num = Math.min(this.number,probs.length)
        probs = probs.slice(0,num)
      }
      return probs
    },
  },
  methods: {
    getScore: function() {
      let scr = 0
      test=this.$store
      try {
        for (index in this.problems) {
          scr+=this.$store[index]["score"]
        }
      } catch { scr = 0 }
      this.score=scr
      return scr
    },
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
  <div v-on:click=getScore()>
  <div> {{score}} </div>
    <div v-for="(problem,index) in problems">
      <problem :text= 'problem' :name = 'index'/>
    </div>
  </div> `
})
