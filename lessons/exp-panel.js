var ExpPanel = Vue.extend({
  props: {
    header: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  template: `
    <v-expansion-panel>
      <v-expansion-panel-header class="font-weight-black">{{header}}</v-expansion-panel-header>
      <v-expansion-panel-content><span v-html="body"/></v-expansion-panel-content>
    </v-expansion-panel>
  `
})
