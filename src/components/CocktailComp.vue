<template>
  <div v-if="displayed" v-bind:class="{selClass: isSelected}" @click="toggleSelected">
    <h3>{{ cocktailName }}</h3>
  </div>
</template>

<script>
export default {
  props: ['cocktailName','isSelected','cocktailIngredients','displayed','description'],
  methods: {
    toggleSelected() {
      this.$emit('toggle-selected', this.cocktailName);
    }
  }
}
</script>

<style scoped>
  div {
    color: #494c50;
    width: fit-content;
    max-width: 150px;
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