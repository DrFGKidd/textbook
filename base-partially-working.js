var problem0 = Vue.component('problem0', {
  data: function () {
    return {
      	hint_counter:0,
				weight: (Math.random()*(600-300)+300).toFixed(0),
				force: (Math.random()*(300- 100)+ 100).toFixed(0),
				acceleration_answer: '',
				acceleration_tolerance: .01,
				mass_answer: '',
				mass_tolerance: .01,
				gravity_answer: '',
				gravity_tolerance: .01,
        rules: {
          required: value => !!value || 'Required.',
          acceleration_check: value => this.acceleration*(1+this.acceleration_tolerance)>=value && this.acceleration*(1-this.acceleration_tolerance)<=value || "That's incorrect. Try again.",
        },
    }
  },
  computed: {
    acceleration: function () {
			return this.force/(this.weight/9.81)
		},
		acceleration_correct: function () {
			return this.acceleration*(1+this.acceleration_tolerance)>=this.acceleration_answer && this.acceleration*(1-this.acceleration_tolerance)<=this.acceleration_answer
		},
    acceleration_success: function () {
      if (this.acceleration_correct) {
        return ["Correct!"]
      } else {
        return []
      }
    },
		mass: function () {
			return this.weight/9.81
		},
		mass_correct: function () {
			return this.mass*(1+this.mass_tolerance)>=this.mass_answer && this.mass*(1-this.mass_tolerance)<=this.mass_answer
		},
		gravity: function () {
			return 9.81
		},
		gravity_correct: function () {
			return this.gravity*(1+this.gravity_tolerance)>=this.gravity_answer && this.gravity*(1-this.gravity_tolerance)<=this.gravity_answer
		},

  },
  template: `
    <div class="problem ma-5">
      <h3>Problem 1</h3>
         A boy weighs {{ weight }} Newtons. If he experiences a force of {{  force }} Newtons,
    what is the boy's acceleration in \\(\\frac{m}{s^2}\\)? <v-text-field :success-messages="acceleration_success" label='Acceleration' dense  class='d-inline-block'  :rules="[rules.required, rules.acceleration_check]"  id = acceleration v-model=acceleration_answer v-bind:class="[acceleration_correct ? 'correct' : 'wrong']"></v-text-field>
    <hr/>
      <span class='hint' v-bind:class="[hint_counter>0 ? 'show' : 'hide']">
			Remember, \\(F = ma\\). However, they gave us the weight not the mass. You will need to use the weight to calculate the mass of the boy. What is the boy's mass in kilograms? <input id = mass v-model=mass_answer v-bind:class="[mass_correct ? 'correct' : 'wrong']">
	</span>
  <br><br>
	<span class='hint' v-bind:class="[hint_counter>1 ? 'show' : 'hide']">
			Just in case you are struggling, don't forget that \\(W = mg\\). But what is g? Enter the value of gravity in \\(\\frac{m}{s^2}\\) <input id = gravity v-model=gravity_answer v-bind:class="[gravity_correct ? 'correct' : 'wrong']">
	</span>

      <button v-on:click="hint_counter+=1"> Show Hint?</button>
    </div>`,
})
