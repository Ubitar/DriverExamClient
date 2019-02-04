<template>
  <div class="div-flex-column" @click="onClick">
    <slot></slot>
  </div>
</template>

<script >
export default {
  name: "DivFlexColumn",
  methods: {
    onClick(e) {
      this.$emit('click', e);
    }
  }
}

</script>

<style scoped>
.div-flex-column {
	display: flex;
	flex-direction: column;
}
</style>
