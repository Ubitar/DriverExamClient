<template>
  <div class="check-box-group" :class="{'vertical':isVertical}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "CheckboxGroup",
    data() {
      return {
        labels: []
      }
    },
    provide() {
      return {
        CheckboxGroup: this
      }
    },
    props: {
      vertical: {
        type: String,
        default: "false"
      },
      value:{
        type:Array,
        default: []
      }
    },
    computed: {
      isVertical: function () {
        if (this.vertical != "false") return true;
        return false;
      }
    },
    watch:{
      value:function (val) {
        this.labels=this.value
      }
    },
    mounted(){
      if(this.value instanceof Array) this.labels=this.value;
      else this.labels=[]
    },
    created() {
      this.$on("handleChange", function (value) {
        var index = this.labels.indexOf(value);
        if (index >= 0) this.labels.splice(index, 1);
        else this.labels.push(value)
        this.$emit('change', this.labels)
        this.$emit("input", this.labels)
      })
    }
  }
</script>

<style scoped>
  .check-box-group {
    display: flex;
    flex-direction: row;
  }

  .vertical {
    flex-direction: column;
  }
</style>
