<template>
  <div>
    <!-- Legend for cocktails and ingredient selection -->
    <div class="cocktailDiv">
      <div v-bind:class="{legend: true, specialClass: true}">
        <h3>Cocktail qui contient des ingrédients séléctionnés</h3>
        <p></p>
      </div>
    </div>
    <div class="cocktailDiv">
      <div v-bind:class="{legend: true}">
        <h3>Cocktail qui contient <i>tous</i> les ingrédients sélectionnés</h3>
        <p>Si plusieurs ingrédients sont sélectionnés</p>
      </div>
    </div>
    <div class="cocktailDiv">
      <div v-bind:class="{legend: true, selClass: true}">
        <h3>Cocktail / Ingrédient séléctionné</h3>
        <p></p>
      </div>
    </div>
    <div v-bind:class="{legend: true, greyedOutClass: true}">
      <h3>Cocktail qui ne contient <i>aucun</i> des ingrédients sélectionnés</h3>
      <p></p>
    </div>
  </div>
</template>

<script>
  // No script content for the Legend component
</script>

<style scoped>
  div {
    /* Styles for legend container */
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: fit-content;
    width: fit-content;
  }
  p {
    /* Styles for text within the legend */
    font-size: small;
    margin-top: 2px;
  }
  h3 {
    /* Styles for heading within the legend */
    margin-bottom: 0;
  }
  .legend {
    /* Styles for the legend boxes */
    color: #494c50;
    width: fit-content;
    height: fit-content;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    text-align: center;
  }
  .greyedOutClass {
    max-width: 150px;
  }
  div:hover {
    /* Cursor style for hovering */
    cursor: default;
  }

  /*=========== Tablet/landscape phone design ============*/

  @media only screen and (max-width: 1000px) {
    div {
      padding: 0;
    }
    .legend {
      padding: 2px;
      margin-top: 2px;
      border-radius: 10px;
      margin: 2px;
      max-width: 100px;
    }
    h3 {
      font-size: 15px;
    }
  }

  /*=========== Portrait phone design ============*/

  @media only screen and (max-width: 600px) {
    .legend {
      max-width: 45vw;
    }
  }
</style>