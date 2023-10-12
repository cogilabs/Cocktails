<template>
    <cocktail-comp 
      v-for="x in ings"
      v-bind:ing-name="x"/>
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
        this.ings = ingList;
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
    border: solid #494c50 1px;
    color: #9aa0a6;
    width: 100px;
    padding: 10px;
    margin-top: 10px;
    background-color: #e4ebff;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 10px;
    margin: 10px;
  }
</style>
