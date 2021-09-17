var Problem = Vue.extend({
  data: function () {
    return {
  			hint_counter:0,
        score:0,
        last_score:0,
    }
  },
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  created: function () {
    this.$store[this.name]={score:0, blanks:0, max_score:0}
  },
  methods: {
    parseItem: function(text) {
      text = text.substr(1,text.length-3)
      let items = text.split(" ")
      let name = items[0]
      let props = {}
      for (let i = 1; i< items.length; i++) {
        let pieces = items[i].split("=")
        props[pieces[0]]=pieces[1]
      }
      return [name,{props}]
    },
    parseText: function () {
      let text = this.text
      let match = Array.from(this.text.matchAll("\\<(.*?)\\>"))
      for (i in match) {
        text = text.replace(match[i][0],"XYZ123"+match[i][0]+"XYZ123")
      }
      let elements = text.split("XYZ123").filter(el => {
        return el != null && el != '';
      });
      return elements
    },
    update: function(points) {
      this.score += points
      console.log("I'm in a problem")
      this.$emit('update',this.score-this.last_score)
      this.last_score = this.score
    },
  },
  components: {
    Blank,
    Variable,
    Hint,
    Word
  },
  render: function(createElement) {
    let elements = this.parseText()
    for (i in elements) {
      if (elements[i].includes("<")) {
        let items = this.parseItem(elements[i])
        if (items[0]=="blank") {items[1]['on']={"update":this.update}}
        elements[i]=createElement(items[0],items[1])
      }
    }
    return createElement("div",{"class":"problem pa-5"},elements)
  }
})
