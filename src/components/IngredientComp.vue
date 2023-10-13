<template>
  <div v-bind:style="{ backgroundColor: ingBg, boxShadow: '0 ' + ingShade + ' 0 rgba(0,0,0,0.2)' }" @click="toggleSelected">
    <h4>{{ ingName }}</h4>
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
    color: #494c50;
    width: 100px;
    height: fit-content;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    margin: 10px;
    text-align: center;
  }
  div:hover {
    cursor: pointer;
  }
</style>