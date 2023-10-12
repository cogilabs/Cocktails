<template>
  <div class="master">
    <div class="ing">
      <ingredient-comp 
        v-for="x in ings"
        :key="x.name"
        :ing-name="x.name"
        :ing-bg="x.ingBg"
        :ing-shade="x.ingShade"
        :is-selected="x.selected"
        @toggle-selected="receiveEmit"
      />
    </div>
    <div class="cocktail">
      <cocktail-comp 
        v-for="x in cocktails"
        :key="x.name"
        :cocktail-name="x.name"
      />
    </div>
    <div class="third">

    </div>
  </div>
</template>   

<script>
  export default {
    data() {
      return {
        ings: [],
        cocktails: []
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        const response = await fetch("cocktails.json");
        const json = await response.json();
        const ingList = new Array();
        for (const i in json) {
          this.cocktails.push({name: i});
          for (const j in json[i].Ingredients) {
            if (ingList.length) {
              let okToAdd = true;
              for (const k in ingList) {
                if (json[i].Ingredients[j] == ingList[k]) {
                  okToAdd = false;
                }
              }
              if (okToAdd) {
                ingList.push(json[i].Ingredients[j]);
              }
            } else {
              ingList.push(json[i].Ingredients[j]);
            }            
          }
        }
        for (const i in ingList) {
          this.ings.push({name: ingList[i], isSelected: false, ingBg: "#dde0e7", ingShade: "2px 6px"});
        }
      },
      receiveEmit(ingId) {
        let foundIng = this.ings.find(
          ing => ing.name === ingId
        );
        foundIng.selected = !foundIng.selected;
        if (foundIng.selected) {
          foundIng.ingBg = "#edf2ff";
          foundIng.ingShade = "8px 12px"
        } else {
          foundIng.ingBg = "#dde0e7";
          foundIng.ingShade = "2px 6px"
        }
      }
    }
  }
</script>      

<style>
  body {
    background-color: #aab3ce;
    color: #494c50;
    font-family: Helvetica, Arial, sans-serif;
  }
  .master {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .ing {
    width: 30%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .cocktail {
    border-left: solid #494c50;
    border-right: solid #494c50;
    width: 30%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .third {
    width: 30%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
