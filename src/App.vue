<template>
  <div class="master">
    <div class="ing">
      <div>
        <transition-group name="fade" mode="out-in">
        <ingredient-comp 
          v-for="x in ings"
          :key="'ingredient-' + x.name"
          :ing-name="x.name"
          :ing-bg="x.ingBg"
          :ing-shade="x.ingShade"
          :is-selected="x.isSelected"
          @toggle-selected="receiveEmit"
        />
        </transition-group>
      </div>
    </div>
    <div class="cocktail">
      <div>
        <transition-group name="fade" mode="out-in">
          <cocktail-comp 
            v-for="x in filteredCocktails"
            :key="'cocktail-' + x.name"
            :cocktail-name="x.name"
            :cocktail-ingredients="x.ingredients"
            :displayed="x.displayed"
          />
        </transition-group>
      </div>
    </div>
    <div class="details">

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
    computed: {
      filteredCocktails() {
        return this.cocktails.filter(cocktail => cocktail.displayed);
      }
    },
    methods: {
      async fetchData() {
        const response = await fetch("cocktails.json");
        const json = await response.json();
        const ingList = new Array();
        for (const i in json) {
          this.cocktails.push({
            name: i, 
            ingredients: json[i].Ingredients, 
            displayed: true
          });
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
          this.ings.push({
            name: ingList[i], 
            isSelected: false, 
            ingBg: "#dde0e7", 
            ingShade: "2px 6px"
          });
        }
      },
      receiveEmit(ingId) {
        let foundIng = this.ings.find(
          ing => ing.name === ingId
        );
        foundIng.isSelected = !foundIng.isSelected;
        if (foundIng.isSelected) {
          foundIng.ingBg = "#edf2ff";
          foundIng.ingShade = "8px 12px"
        } else {
          foundIng.ingBg = "#dde0e7";
          foundIng.ingShade = "2px 6px"
        }
        this.listCocktails();
      },
      listCocktails() {
        let checker = (arr, target) => target.every(v => arr.includes(v));
        const selectedIngs = new Array();
        for (const i in this.ings) {
          if (this.ings[i].isSelected == true) {
              selectedIngs.push(this.ings[i].name)
          }
        }
        for (const i in this.cocktails) {
          this.cocktails[i].displayed = checker(this.cocktails[i].ingredients, selectedIngs)
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
    margin: 0;
  }
  .master {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 100vh;
  }
  .ing, .cocktail, .details {
    width: 33%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .cocktail {
    border-left: solid #494c50;
    border-right: solid #494c50;
  }
  .ing > div, .cocktail > div, .details > div {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: fit-content
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.7s, transform 0.7s;
  }
  .fade-leave-active {
    position: absolute;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  .fade-enter-to, .fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  .fade-move {
    transition: all 0.7s
  }
</style>