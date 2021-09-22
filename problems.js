var problems = []
var problemsets = {}
text = `A <word words=boy,girl,dog name=subject/> weighs <variable units=N,lb_f max=300 min=100 name=weight/>. If a force of
<variable units=N,lb_f max=600 min=300 name=force/> is applied, what is the <word name=subject/>'s acceleration?
<blank units=m/s^2,ft/s^2 tol=.01 name=acceleration expression=force/(weight/9.81) />
`
problems.push(text)

text = `A <word words=car,truck,motorcycle name=subject/> weighing <variable units=N,lb_f max=8000, min=4000 name=weight/> is traveling at
<variable units=m/s,ft/s,mph max=15 min=35 name=velocity/>. If a force of
<variable units=N,lb_f max=600 min=300 name=force/> is applied by the brakes, how long will it take the
<word name=subject/> to stop?
<blank units=s tol=.01 name=time expression=velocity/(force/(weight/9.81)) /> <br/>
Also, what is the vehicle's mass? <blank units=kg tol=.01 name=mass expression=weight/9.81/>
`
problems.push(text)

text = `A <word words=man,woman,skater name=subject/> on an electric skateboard is accelerating at <variable units=m/s^2,ft/s^2 max=3.97 min=0.55 name=acceleration/>.
If the <word name=subject/> has a mass of <variable units=kg max=95 min=50 name=mass/>, what is the force the skateboard is applying?
<blank units=N,lb_f tol=.01 name=force expression=mass*acceleration/>`

problems.push(text)

problemsets["trial"]=problems

const store = Vue.observable({
  conversions: {'N':1,'lb_f':.225,'m/s^2':1,'ft/s^2':3.28, 'kg':1, "Pa":1, "atm":0.00000987,
                'm/s':1,'ft/s':3.28,"s":1,"min":60,"hr":3600,"mph":2.2369, "lb_m":2.205},
  problemsets: problemsets,
})
Vue.prototype.$store = store
