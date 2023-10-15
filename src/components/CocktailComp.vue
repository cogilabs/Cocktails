<template>
  <div v-if="displayed" v-bind:style="{ backgroundColor: divBg, boxShadow: '0 ' + divShade + ' 0 rgba(0,0,0,0.2)' }" @click="toggleSelected">
    <h3>{{ cocktailName }}</h3>
  </div>
</template>

<script>
export default {
  props: ['cocktailName','isSelected','divBg','divShade','cocktailIngredients','displayed','description'],
  methods: {
    toggleSelected() {
      this.$emit('toggle-selected', this.cocktailName);
    }
  }
}
</script>

<style scoped>
  div {
    background-color: #ede4d1;
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
  div:hover {
    cursor: pointer;
  }
</style>