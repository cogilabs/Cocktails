<template>
  <div v-bind:style="{ backgroundColor: ingBg, boxShadow: '0 ' + ingShade + ' 0 rgba(0,0,0,0.2)' }" @click="toggleSelected">
    <h2>{{ ingName }}</h2>
  </div>
</template>

<script>
export default {
  props: ['ingName','isSelected','ingBg','ingShade'],
  methods: {
    toggleSelected() {
      this.$emit('toggle-selected', this.ingName);
    }
  }
}
</script>

<style scoped>
  div {
    color: #828589;
    width: 100px;
    height: 70px;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    margin: 10px;
  }
  div:hover {
    cursor: pointer;
  }
</style>