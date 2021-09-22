var Quiz = Vue.extend({
  data: function() {
    return {
      score: 0,
      drawer: false,
      overlay: null,
      page: 1,
    }
  },
  props: {
    name: {default: "Quiz"},
    problemsets: {required: true},
    random: {default: false},
    number: {default: 0},
    max_per_page: {default: 3}
  },
  computed: {
    all_problems: function() {
      let all_probs = []
      for (i in this.problemsets) {
        let [key, ran, num] = this.problemsets[i]
        let probs = this.$store.problemsets[key]
        if (ran) {
          probs = this.shuffle(probs)
        }
        if (!isNaN(num) && num>0) {
          let num = Math.min(num,probs.length)
          probs = probs.slice(0,num)
        }
        all_probs = all_probs.concat(probs)
      }
      if (this.random) {
        all_probs = this.shuffle(all_probs)
      }
      if (!isNaN(this.number) && this.number>0) {
        let num = Math.min(this.number,all_probs.length)
        all_probs = all_probs.slice(0,num)
      }
      return all_probs
    },
    code: function() {
        let seed = Math.round(Math.random()*1000).toString()
        return this.encrypt(this.score.toString(),9988)+this.encrypt("random",seed)
    },
    pages: function() {
      return Math.ceil(this.all_problems.length/this.max_per_page)
    }
  },
  methods: {
    update: function(points) {
      this.score+=points
    },
    show_page: function(index) {
      if (!(index<this.page*this.max_per_page && index>=(this.max_per_page*(this.page-1)))) {
        return "{font-size:100%; visibility:hidden; height:0; width:0; overflow:hidden; position:absolute; right:0; bottom:0}"
      }
      return ""
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
    },
    encrypt: function(str, seed) {
      let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
      for (let i = 0, ch; i < str.length; i++) {
          ch = str.charCodeAt(i);
          h1 = Math.imul(h1 ^ ch, 2654435761);
          h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        return (4294967296 * (2097151 & h2) + (h1>>>0)).toString(25).toUpperCase()
    }
  },
  components: {
    ProblemSet,
    Problem,
    LessonSidebar
  },
  template: `
  <div>
    <v-navigation-drawer width="33%" v-model="drawer" app>
      <lesson-sidebar name="force"/>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{name}}</v-toolbar-title>
      <v-spacer/>
      <span class="text-h6">Current Score  &nbsp; </span>
      <v-btn fab color="indigo" small @click="overlay=!overlay">
        <span class="white--text">{{Math.round(score*30)}}</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-overlay :value="overlay">
      <div class="text-center">
        <h3>Your quiz code is <strong>{{code}}</strong></h3>
        </div><div class="text-center">
          <v-btn color="red" size="36" @click="overlay=!overlay">Back to Quiz</v-btn>
        </div>
      </v-overlay>
      <div v-for="(problem, index) in all_problems">
          <problem v-bind:style="show_page(index)" v-on:update='update($event)' :text= 'problem' :name = 'index'/>
      </div>
      <v-pagination v-if="pages>1" v-model="page" :length="pages"></v-pagination>
    </v-main>
  </div>
  `
})
