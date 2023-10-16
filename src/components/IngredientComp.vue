<template>
  <div v-show="displayed" v-bind:style="{ backgroundColor: divBg, boxShadow: '0 ' + divShade + ' 0 rgba(0,0,0,0.2)' }" @click="toggleSelected">
    <h4>{{ ingName }}</h4>
  </div>
</template>

<script>
export default {
  props: ['ingName','isSelected','divBg','divShade','displayed'],
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
    width: fit-content;
    max-width: 120px;
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