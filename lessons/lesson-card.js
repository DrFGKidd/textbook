var LessonCard = Vue.extend({
  props: {
    img_src: {
      type: String,
      default: ""
    },
    title: {type: String},
    equations: {
      type: String,
      default: ""
    }
  },
  template: `
  <v-hover v-slot="{ hover }">
    <v-card
     class="mx-auto"
     color="grey lighten-4"
     max-width="600"
    >
     <v-img
       :src="img_src"
     >
       <v-expand-transition>
         <div
           v-if="hover"
           class="d-flex transition-fast-in-fast-out grey darken-2 v-card--reveal text-h4 white--text"
           style="height: 100%;"
         >
           <div class="text-center">{{equations}}</div>
         </div>
       </v-expand-transition>
     </v-img>
     <v-card-text
       class="text-center"
       style="position: relative;"
     >
     <h2>{{title}}</h2>
     </v-card-text>
    </v-card>
  </v-hover>
  `
})
