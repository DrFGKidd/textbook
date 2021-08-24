<template>
	<div id="app">
    <v-app>
  		<h1>Creating a Fill in the Blank Numerical Problem</h1>
  		<Problem name="problem1" text="A boy weighs <variable units=N,lb_f max=300 min=100 name=weight/>. If a force of
      <variable units=N,lb_f max=600 min=300 name=force/> is applied, what is the boy's acceleration?
      <blank units=m/s^2,ft/s^2 tol=.01 name=acceleration expression=force/(weight/9.81) />"/>
    </v-app>
	</div>
</template>

<script>
import Problem from './components/Problem.vue'

export default {
	components: {
		Problem
	}
}
</script>
