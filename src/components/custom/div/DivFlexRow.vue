<template>
  <div class="div-flex-row" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DivFlexRow",
  methods: {
    onClick(e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style scoped>
.div-flex-row {
	display: flex;
	flex-direction: row;
}
</style>
