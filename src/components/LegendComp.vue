<template>
  <div>
    <div class="cocktailInt">
      <div v-bind:class="{legend: true, specialClass: true}">
        <h4>Cocktail / Ingrédient</h4>
      </div>
    </div>
    <div class="cocktailInt">
      <div v-bind:class="{legend: true}">
        <h4>Cocktail qui contient <i>tous</i> les ingrédients sélectionnés</h4>
      </div>
    </div>
    <div class="cocktailInt">
      <div v-bind:class="{legend: true, selClass: true}">
        <h4>Cocktail / Ingrédient séléctionné</h4>
      </div>
    </div>
    <div v-bind:class="{legend: true, greyedOutClass: true}">
      <h4>Cocktail qui ne contient <i>aucun</i> ingrédients sélectionnés</h4>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
div {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: fit-content;
}
.legend {
  color: #494c50;
  width: fit-content;
  height: fit-content;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  margin: 10px;
  text-align: center;
}
</style>