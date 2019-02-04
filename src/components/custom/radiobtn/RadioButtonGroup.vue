<template>
  <div class="radio-button-group" :class="{'vertical':isVertical}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "RadioButtonGroup",
    data() {
      return {
        label: this.value
      }
    },
    provide() {
      return {
        RadioButtonGroup: this
      }
    },
    props: {
      value: null,
      vertical:{
        type:String,
        default:"false"
      }
    },
    computed:{
      isVertical:function () {
        if(this.vertical!="false") return true;
        return false;
      }
    },
    watch:{
      value:function (val) {
        this.label=this.value
      }
    },
    created() {
      this.$on("handleChange", function (value) {
        if (value != this.label)
          this.label = value;
        this.$emit('change', this.label)
        this.$emit("input",  this.label)
      })
    }
  }
</script>

<style scoped>
  .radio-button-group {
    display: flex;
    flex-direction: row;
  }

  .vertical{
    flex-direction: column;
  }
</style>
