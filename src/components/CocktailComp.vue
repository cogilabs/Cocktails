<template>
  <div v-if="displayed">
    <h3>{{ cocktailName }}</h3>
  </div>
</template>

<script>
export default {
  props: ['cocktailName', 'CocktailIngredients', 'displayed']
}
</script>

<style scoped>
  div {
    background-color: #dde0e7;
    box-shadow: 0 5px 6px 0 rgba(0,0,0,0.2);
    color: #494c50;
    width: 150px;
    height: fit-content;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    margin: 10px;
    text-align: center;
  }
</style>