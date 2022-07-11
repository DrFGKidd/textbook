var ForceLesson = Vue.extend({
  components: {
    Problem,
    LessonCard,
    ExpPanel
  },
  template: `
  <div>
    <lesson-card
      title="Force and Weight"
      equations="\\[ \\sum F=ma \\\\ W=mg \\\\ g=9.81 \\frac{m}{s^2}=32.2\\frac{ft}{s^2} \\]"
      img_src="./images/rocket-1.gif"
      />
    <v-row justify="center">
      <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-black">What is a Force?</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>Force is a push or pull. Any time you lift a laptop, set your coffee down on the table, or notice the computer pressing on your forehead
          as you go to sleep, you are experiencing forces.</p> <v-img src="./images/sleeping-employee.svg"></v-img>
          <p>Force is controlled by Newton's laws. Newton's second law says that when
          you apply a force, it will cause something to accelerate (change in velocity) unless another force
          stops the object.</p>
          <p>Newton's second law is written as shown: \\[\\sum \\vec{F}=m\\vec{a} \\]
          The strange E \\( (\\sum) \\) means that you add up all the forces on the object.
          Force \\((\\vec{F})\\) and acceleration\\((\\vec{a})\\) are vectors which is why they have the small arrow\\((\\vec{ })\\) above them.
          That means that their direction is important.</p><p>For example, if you press on a ball pushing it
          to the right, it doesn't suddenly jump into the air or go left. It goes to the right. That is because all the forces
          added up point to the right and so the acceleration points in that same direction.
          <v-img src="./images/pushing-weight.gif"></v-img></p><p> Always be careful that all forces have been taken into
          account. For example, when you are trying to push something up hill, the weight becomes another force you have to consider.</p>
        </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-black">What is Weight?</v-expansion-panel-header>
          <v-expansion-panel-content>
          <p>Weight is just a particular type of force. It is the force of the Earth's gravity pulling you towards it.
          This is why you stay on the planet regardless of whether you are jumping in Australia or the United States.
          Gravitational force actually happens between everything in the universe and follows the law shown below.
          \\[F_G=\\frac{G \\cdot m_1 \\cdot m_2}{r^2}\\]Where \\(G\\) is the fancy Gravitational constant, \\(m\\) is the mass of one of two objects, and \\(r\\) is
          the distance between them. </p><p>Lucky for us and for you, most objects nearby are very small
          and the massive objects in our universe are all very VERY far away. That means we can simplify that earlier equation
          and just think about how the Earth pulls on us rather than on how everything pulls on us. This changes the equation
          to a form you might be familiar with. \\[g=\\frac{G \\cdot m_2}{r^2} \\\\ F_G=W=mg\\]</p>
          <p>This has the same exact form as our force equation. Now we name a particular force which is the weight. Also,
          we learn something interesting, which is that gravity is felt as an acceleration. This acceleration is \\(9.81 \\frac{m}{s^2}\\) or \\(32.2 \\frac{ft}{s^2}\\).
          This is the reason that no matter what the weight of an object, objects all accelerate downward at the same rate.
          <v-img src='./images/falling.gif'></v-img></p><p>This makes problems around weight fairly simple. You always know what gravity is and therefore you only ever have two unknowns.</p>
          </v-expansion-panel-content>
          </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
</div>
  `
})
