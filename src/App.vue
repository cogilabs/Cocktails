<template>
    <cocktail-comp 
      v-for="x in ings"
      :key="x.name"
      :ing-name="x.name"
      :ing-bg="x.ingBg"
      :is-selected="x.selected"
      @toggle-selected="receiveEmit"
    />
</template>   

<script>
  export default {
    data() {
      return {
        data: null,
        ings: []
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
          const newIng = {name: ingList[i], isSelected: false, ingBg: "#dde0e7"};
          this.ings.push(newIng);
        }
      },
      receiveEmit(ingId) {
        let foundIng = this.ings.find(
          ing => ing.name === ingId
        );
        foundIng.selected = !foundIng.selected;
        if (foundIng.selected) {
          foundIng.ingBg = "#edf2ff"
        } else {
          foundIng.ingBg = "#dde0e7"
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
  .ing {
    color: #828589;
    width: 100px;
    padding: 10px;
    margin-top: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 10px;
    margin: 10px;
  }
</style>
