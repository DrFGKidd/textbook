var LessonSidebar = Vue.extend({
  props: {
    name: {type: String},
  },
  computed: {
    sidebar: function() {
        return this.name.toLowerCase()+"-lesson"
    }
  },
  components: {
    ForceLesson
  },
  template: `
    <component v-bind:is="sidebar"></component>
  `
})
