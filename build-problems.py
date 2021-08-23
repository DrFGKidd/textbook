'''
This code takes a problem's information from the problem-data.xml, parses it and
then creates a vue.js file where each problem is an individual component. Each
problem is instantiated as an individual Python class
'''
import re
import decimal
import os
dir = os.getcwd()
with open(dir+"/problems/base_problem_template.js","r") as myfile:
    problem_template = myfile.read()
class Answer:
    def __init__(self,id,equation,tolerance,errors):
        self.equation = self.make_equation(equation)
        self.rules={}
        self.rules_for_answer = "rules.required,"
        self.rules_text = ""
        self.computed_text = self.make_computed(id,self.equation)
        for i,e in enumerate(errors):
            name = id+"_error_"+str(i)
            self.computed_text += self.make_computed(name,self.make_equation(e[0]))
            self.rules[name] = ["!(this.between(value,this.%s,this.%s_tolerance))" % (name,id),e[1]]
        self.variable_text = self.make_text(id+"_answer","''")
        self.variable_text += self.make_text(id+"_tolerance",tolerance)
        self.rules[id]=["this.between(value,this.%s,this.%s_tolerance)" % (id,id),"That is incorrect."]
        self.make_rules()
        self.id_text='''<v-text-field dense label=%s class='d-inline-block' v-model=%s_answer :rules="[%s]" :success-messages="correct('%s')"></v-text-field>''' % (id.capitalize(),id,self.rules_for_answer[:-1],id)
    def make_equation(self,equation):
        vars = re.findall("[A-Za-z]+",equation)
        for v in vars: equation = equation.replace(v,"this."+v)
        return equation
    def make_text(self,id,item):
        return "\t\t\t\t%s: %s,\n" % (id,item)
    def make_computed(self,id,item):
        return "\t\t%s: function () {\n\t\t\treturn %s\n\t\t},\n" % (id,item)
    def make_rules(self):
        for r in self.rules:
            self.rules_for_answer+="rules."+r+","
            self.rules_text+="\t\t\t\t\t"+ r+": value => "+self.rules[r][0] +"|| '"+self.rules[r][1]+"',\n"
class Variable:
    def __init__(self,id,min,max):
        self.id = id
        self.min = min
        self.max = max
        self.decimals = self.max_decimal()
        self.text = self.make_text()
    def max_decimal(self):
        d = decimal.Decimal(str(self.min))
        decimal_min = abs(d.as_tuple().exponent)
        d = decimal.Decimal(str(self.max))
        decimal_max = abs(d.as_tuple().exponent)
        return max(decimal_min,decimal_max)
    def make_text(self):
        data = (self.id,self.max,self.min,self.min,self.decimals)
        return "\t\t\t\t%s: (Math.random()*(%s-%s)+%s).toFixed(%s),\n" % data


class Problem:
    def __init__(self,id,type,text,hints=[],errors=[]):
        self.id = id
        self.type = type
        self.hints = [hints] if isinstance(hints, str) else hints
        self.variable_text= "\t\t\thint_counter:0,\n"
        self.computed_text = ""
        self.rules_text = "required: value => !!value || 'Required.',\n"
        self.text = self.parse_text(text)
        self.hint_text = ""
        for i,h in enumerate(self.hints):
            self.hint_text += '''<span class='hint' v-bind:class="[hint_counter>%s ? '' : 'd-none']">\n\t\t\t''' % i
            self.hint_text += self.parse_text(h)+"\n\t</span><br>\n\t"
        self.vue = self.create_vue_component()
    def parse_text(self,text):
        text = text.replace('\\','\\\\')
        results = re.findall("\[(.*?)\]", text, re.DOTALL)
        ids = [];
        errors = {}
        for r in results:
            items = r.split(",")
            if items[0]=="answer":
                errors[items[1]]=[]
        for r in results:
            items = r.split(",")
            if items[0]=="error":
                errors[items[1]].append(items[2:])
        for r in results:
            items = r.split(",")
            if items[0]=="answer":
                a=Answer(*items[1:],errors[items[1]])
                ids.append(a.id_text)
                self.variable_text+=a.variable_text
                self.computed_text+=a.computed_text
                self.rules_text+=a.rules_text
            elif items[0] == "error":
                ids.append("")
            else:
                v=Variable(*items[1:])
                ids.append("{{ %s }}" % items[1])
                self.variable_text+=v.text
        def callback(match):
            return next(callback.v)
        callback.v=iter(ids)
        return re.sub("\[(.*?)\]",callback,text)
    def create_vue_component(self):
        data = (self.id, self.id, self.variable_text[:-1],self.rules_text[:-1],
                self.computed_text,self.text, self.hint_text)
        return problem_template % data


import xml.etree.ElementTree as ET
tree = ET.parse(dir+'/problems/problem-data.xml')
root = tree.getroot()
components = ""
for i,child in enumerate(root):
    elements = {}
    hints = []
    errors = {}
    for piece in child:
        if piece.tag == "hint":
            hints.append(piece.text)
        else:
            elements[piece.tag] = piece.text

    p = Problem(i,elements["type"],elements["text"],hints)
    #var = p.variables["gravity"]
    components+=p.vue
with open(dir+'/problems/base.js','w') as myfile:
    myfile.write(components)
    myfile.write("new Vue({el: '#demo'})")
