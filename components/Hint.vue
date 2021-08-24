<script>
export default {
  data: function() {
    return {
      id: this.$parent.id
    }
  },
  props: {
    number: {type: String},
    text:   {type: String},
  },
  components: {
    Variable,
    Blank,
  },
  methods: {
    process: function(text) {
      return "This is processed: "+text
    },
    parseText: function(text) {
      let elements = []
    }
  },
  render: function (createElement) {
    return createElement("variable",
    {
        props: {
          name: "pressure",
          max: 500000,
          min: 200000,
          units: "Pa,atm"
        }
      }
      )
  }
}
</script>
