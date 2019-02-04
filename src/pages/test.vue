<template>
  <div>
    <input name="test" v-model="account" type="text">
    <input name="test2" v-model="account2" type="text">
    <!--<span>{{errors.first('test')}}</span>-->
    <button class="button is-primary" @click="submit">Submit</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        account: "",
        account2: ""
      }
    },
    methods: {
      submit: function () {
        console.log(this.$validator)
        this.$validator.validateAll().then(result => {
          console.log(result)
        })
      }
    }
  }
</script>

<style scoped>

</style>
