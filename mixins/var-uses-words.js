var varUsesWords = {
  props: {
    words: [String, Array],
    name: {type: String}
  },
  created: function() {
    if (!(this.name in this.str)) {
      let possible_words = this.words.split(",")
      this.str[this.name]=possible_words[Math.floor(Math.random()*possible_words.length)]
    }
  },
  computed: {
    final_value: function() {  
      return this.str[this.name]
    }
  }
}
