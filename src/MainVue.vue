<template>
  <div class="master">
    <div class="ingColumn column">
      <!-- Ingredients Section -->
      <div class="sectionTitle">
        <h1>Ingrédients</h1>
      </div>
      <!-- Input for ingredient search -->
      <input type="text" v-model="ingSearch" v-on:input="reListIngs(ingSearch)" placeholder="Entrez un ingrédient">
      <div class="ingDiv" v-show="selectedIngredientsCount > 0">
        <!-- Button to deselect all ingredients -->
        <button class="uncheckBtn" v-on:click="uncheckAllIngs()">Déselectionner tous les ingrédients</button>
        <!-- List of selected ingredients -->
        <transition-group name="ingSel">
          <card-comp 
            v-for="ingredient in ingredientList"
            :key="'ingredientSel-' + ingredient.name"
            :name="ingredient.name"
            :displayed="(ingredient.displayed && ingredient.isSelected)"
            :is-selected="ingredient.isSelected"
            :type="'ingredient'"
            @toggle-selected="receiveEmit"
          />
        </transition-group>
      </div>
      <!-- List of available ingredients -->
      <div class="ingDiv">
        <transition-group name="ing">
          <card-comp 
            v-for="ingredient in ingredientList"
            :key="'ingredient-' + ingredient.name"
            :name="ingredient.name"
            :displayed="ingredient.displayed && !ingredient.isSelected"
            :is-selected="ingredient.isSelected"
            :type="'ingredient'"
            @toggle-selected="receiveEmit"
          />
        </transition-group>
      </div>
    </div>
    <div class="cocktailColumn column">
      <!-- Cocktails Section -->
      <div class="sectionTitle">
        <h1>Cocktails</h1>
      </div>
      <input type="text" v-if="selectedIngredientsCount == 0" v-model="cocktailSearch" v-on:input="listCocktails(cocktailSearch)" placeholder="Entrez un cocktail">
      <div class="cocktailDiv">
        <!-- List of cocktails -->
        <transition-group name="fadeMove">
          <card-comp 
            v-for="cocktail in cocktailList"
            :key="'cocktail-' + cocktail.name"
            :name="cocktail.name"
            :displayed="cocktail.displayed"
            :special="cocktail.special"
            :is-selected="cocktail.isSelected"
            :abv-score="cocktail.abvScore"
            :type="'cocktail'"
            @toggle-selected="receiveEmit"
          />
        </transition-group>
      </div>
      <div>
        <!-- List of greyed-out cocktails -->
        <transition-group name="fadeMove">
          <card-comp 
            v-for="cocktail in cocktailList"
            :key="'cocktailGreyedOut-' + cocktail.name"
            :name="cocktail.name"
            :displayed="!(cocktail.displayed)"
            :greyedOut="!(cocktail.displayed)"
            :abv-score="cocktail.abvScore"
          />
        </transition-group>
      </div>
    </div>
    <div class="detailsColumn column">
      <!-- Details Section -->
      <div class="sectionTitle">
        <h1 v-show="this.details.text">Détails et recette</h1>
        <h1 v-show="!this.details.text">Légende</h1>
      </div>
      <div class="detailsDiv">
        <router-link v-if="details.title" :to="'/cocktail/' + details.title.replace(/ /g,'').toLowerCase()">Voir en plus grand</router-link>
        <transition name="fadeMove">
          <!-- Display cocktail details -->
          <details-comp 
            v-if="details"
            :cocktailName="details.title"
            :cocktailABV="details.abv"
            :detailsText="details.text"
          />
        </transition>
        <transition name="fadeMove">
          <!-- Display legend if no cocktail is selected -->
          <legend-comp
            v-if="!details.text"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // Data properties for ingredient and cocktail lists
        ingredientList: [],
        cocktailList: [],
        details: {
          title: "",
          abv: "",
          text: "",
        },
        ingSearch: "",
        cocktailSearch: "",
        maxAbv: 30, // The ABV considered like a five star cocktail, in %
      };
    },
    mounted() {
      // Fetch initial data when the component is mounted
      this.fetchData();
    },
    computed: {
      selectedIngredientsCount() {
        // Calculate the count of selected ingredients
        const selectedIngredients = new Array();
        for (const i in this.ingredientList) {
          if (this.ingredientList[i].isSelected == true) {
            selectedIngredients.push(this.ingredientList[i].name)
          }
        }
        return selectedIngredients.length;
      }
    },
    methods: {
      async fetchData() {
        // Fetch cocktail data from a JSON file and populate ingredient and cocktail lists
        const response = await fetch("/cocktails.json");
        const json = await response.json();
        const ingList = new Array();
        for (const i in json) {
          // Populate cocktailList with data from the JSON file
          this.cocktailList.push({
            name: i, 
            isSelected: false, 
            ingredients: json[i].ingredients, 
            description: json[i].description,
            abv: json[i].abv,
            displayed: true,
            special: true,
            abvScore: "🍹".repeat((parseInt(json[i].abv) + (this.maxAbv*0.2)) / (this.maxAbv*0.2)),
          });
          this.cocktailList.sort((a, b) => {
            return (a.name).localeCompare(b.name);
          });
          for (const j in json[i].ingredients) {
            // Populate ingList with unique ingredients
            if (ingList.length) {
              let okToAdd = true;
              for (const k in ingList) {
                if (json[i].ingredients[j] == ingList[k]) {
                  okToAdd = false;
                }
              }
              if (okToAdd) {
                ingList.push(json[i].ingredients[j]);
              }
            } else {
              ingList.push(json[i].ingredients[j]);
            }            
          }
        }
        for (const i in ingList) {
          // Populate ingredientList with data from ingList
          this.ingredientList.push({
            name: ingList[i], 
            isSelected: false, 
            displayed: true
          });
        }
        this.ingredientList.sort((a, b) => {
          return (a.name).localeCompare(b.name);
        });
      },
      receiveEmit(divType, divId) {
        // Handle the selection of ingredients or cocktails
        this.ingSearch = ""
        this.cocktailSearch = ""
        let foundObject = ""

        if (divType == "cocktail") {
          foundObject = this.cocktailList.find(
            cocktail => cocktail.name === divId
          );
          if (foundObject.displayed) foundObject.isSelected = !foundObject.isSelected;
          for (const i in this.cocktailList) {
            if (this.cocktailList[i] != foundObject) {
              this.cocktailList[i].isSelected = false;
            }
          }
          if (foundObject.isSelected){
            this.details = {
              title: foundObject.name,
              abv: foundObject.abv,
              text: foundObject.description,
            }
          } else {
            this.details = {
              title: "",
              abv: "",
              text: "",
            }
          }
        } else {
          foundObject = this.ingredientList.find(
            ing => ing.name === divId
          );
          if (foundObject.displayed) foundObject.isSelected = !foundObject.isSelected;
          for (const i in this.cocktailList) {
            if (!this.cocktailList[i].displayed) {
              if (this.cocktailList[i].isSelected == true) {
                this.details = {
                  title: "",
                  abv: "",
                  text: "",
                }
              }
            }
          }
        }
        this.listCocktails();
          for (const i in this.cocktailList) {
            if (!this.cocktailList[i].displayed) {
              if (this.cocktailList[i].isSelected == true) {
                this.details = {
                  title: "",
                  abv: "",
                  text: "",
                }
              }
            }
          }
      },
      listCocktails(searchParams) {
        // Filter and display cocktails based on selected ingredients or search parameters
        for (const i in this.cocktailList) {
          if (!this.cocktailList[i].displayed) {
            this.cocktailList[i].isSelected = false;
          }
        }
        if (searchParams) {
          const allCocktails = new Array();
          for (const i in this.cocktailList) {
            this.cocktailList[i].displayed = false;
            allCocktails.push(this.cocktailList[i].name)
          }
          for (const i in allCocktails) {
            if (allCocktails[i].toLowerCase().includes(searchParams.toLowerCase())) {
              this.cocktailList[i].displayed = true
            }
          }
          return
        }
        let containsAll = (arr, target) => target.every(v => arr.includes(v));
        const selectedIngredients = new Array();
        const possibleCocktails = new Array();
        for (const i in this.ingredientList) {
          if (this.ingredientList[i].isSelected == true) {
            selectedIngredients.push(this.ingredientList[i].name)
            for (const j in this.cocktailList) {
              this.cocktailList[j].abvScore = "🍹".repeat((parseInt(this.cocktailList[j].abv) + (this.maxAbv*0.2)) / (this.maxAbv*0.2))
              if (this.cocktailList[j].ingredients.includes(this.ingredientList[i].name)) {
                possibleCocktails.push(this.cocktailList[j].name)
              }
            }
          }
        }
        for (const i in this.cocktailList) {
          this.cocktailList[i].special = false
          this.cocktailList[i].displayed = (containsAll(this.cocktailList[i].ingredients, selectedIngredients) || possibleCocktails.includes(this.cocktailList[i].name))
          if (selectedIngredients.length > 1) {
            if (!(containsAll(this.cocktailList[i].ingredients, selectedIngredients))) {
              this.cocktailList[i].special = possibleCocktails.includes(this.cocktailList[i].name)
            }
          } else { 
            this.cocktailList[i].special = true
          }
        }

        this.reListIngs()
      },
      reListIngs(searchParams) {
        // Filter and display ingredients based on search parameters
        if (!searchParams) {
          searchParams = ""
        }
        const allIngs = new Array();
        for (const i in this.ingredientList) {
          this.ingredientList[i].displayed = false;
          allIngs.push(this.ingredientList[i].name)
        }
        for (const i in allIngs) {
          if (allIngs[i].toLowerCase().includes(searchParams.toLowerCase())) {
            this.ingredientList[i].displayed = true
          }
        }
      },
      uncheckAllIngs() {
        // Deselect all ingredients and update the displayed cocktails
        for (const i in this.ingredientList) {
          this.ingredientList[i].isSelected = false;
          this.listCocktails();
        }
      }
    }
  }
</script>      

<style>
  body {
    /* Global styles for the body */
    background-image: url(https://cogilabs.eu/Images/Pinstripe2.png);
    background-repeat: repeat;
    background-color: #18222c;
    color: whitesmoke;
    font-family: Helvetica, Arial, sans-serif;
    margin: 0;
  }
  router-view, a {
  text-decoration: none;
  color: goldenrod;
  }
  router-view:hover, a:hover {
    text-decoration: underline;
  }
  ::selection {
    /* Disable the ability to select text (at least visually) */
    background: #00000000;
  }
  .sectionTitle {
    /* Styles for section titles */
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .sectionTitle > h1 {
    width: 60%;
    background-color: #423d32;
    margin: 0;
    padding: 10px;
    border-radius: 10px;
  }
  .master {
    /* Styles for the main container */
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 100vh;
  }
  .column {
    /* Styles for columns */
    width: 33%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    height: 100%;
    overflow-y: auto;
  }
  .cocktailColumn, .detailsColumn {
    border-left: solid #f4b126;
  }
  .column > div {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: fit-content;
  }
  .ingDiv > div {
    max-width: 120px;
  }
  .cocktailDiv > div {
    max-width: 150px;
  }
  .cocktailDiv > div > h4 {
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }
  .ingDiv > div:not(.selClass) {
    background-color: #ede4d1;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2)
  }
  .cocktailDiv > div:not(.selClass):not(.specialClass) {
    background-color: #ffe95e;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2)
  }
  .selClass {
    background-color: #f4b126;
    box-shadow: 0 8px 12px 0 rgba(0,0,0,0.2)
  }
  .greyedOutClass {
    background-color: #777777;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
    max-width: 120px;
  }
  .greyedOutClass:hover, .sectionTitle {
    cursor: default;
  }
  .specialClass:not(.selClass) {
    background-color: #ede4d1;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
  }
  .cocktailDiv > div:hover, .ingDiv > div:hover {
    cursor: pointer;
  }
  .detailsDiv * {
    width: 30vw;
  }
  .detailsDiv:hover {
    cursor: auto;
  }
  .detailsDiv *::selection {
    background: goldenrod;
    color: black;
  }
  .legend *::selection {
    background: #00000000;
    color: unset;
  }
  input {
    height: fit-content;
    width: 30vw;
    margin-top: 10px
  }
  input::selection {
    /* Reenable the ability to select text for input boxes */
    background: lightsteelblue;
  }
  .uncheckBtn {
    height: fit-content;
    width: 30vw;
  }

  /*=========== Animations ============*/

  .ingSel-enter-active {
    transition: opacity cubic-bezier(1,-0,1,-2) 0.5s, transform 0.5s;
  }
  .ing-enter-from, .ing-leave-to {
    transform: translateY(-120px);
  }
  .ing-leave-active {
    position: absolute;
  }
  .ing-move {
    transition: all 0.5s
  }

  .ingSel-enter-from, .ingSel-leave-to {
    opacity: 0;
  }
  .ingSel-enter-to, .ingSel-leave-from {
    opacity: 1;
  }
  .ingSel-enter-active {
    transition: opacity cubic-bezier(1,-0,1,-2) 0.5s;
  }

  .fadeMove-enter-active, .fadeMove-leave-active {
    transition: opacity cubic-bezier(.3,1,.3,1) 0.5s, transform 0.5s;
  }
  .fadeMove-leave-active {
    position: absolute;
  }
  .fadeMove-enter-from, .fadeMove-leave-to {
    opacity: 0;
    transform: translateY(-120px);
  }
  .fadeMove-enter-to, .fadeMove-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  .fadeMove-move {
    transition: transform 0.5s;
    transition-timing-function: cubic-bezier(0.42, 0, 1, 1); 
  }

  #dotsAndLinesCanvas {
    position: fixed;
    left:0;
    top:0;
    z-index:-1;
    width: 100%;
    height: 100%;
  }

  /*=========== Tablet/landscape phone design ============*/

  @media only screen and (max-width: 1000px) {
    .sectionTitle {
      width: 100%;
      display: flex;
      justify-content: center;
      text-align: center;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
    }
    .sectionTitle > h1 {
      width: 100%;
      padding: 0;
      border-radius: 0;
      font-size: 25px
    }
    .column > div {
      padding: 0;
    }
    .detailsDiv * {
      width: 30vw;
    }
    .detailsContent {
      margin-bottom: 50vh;
    }
    input {
      width: 100vw;
      margin-top: 0
    }
    .uncheckBtn {
      margin-top: 0
    }
    .ing-enter-from, .ing-leave-to, .fadeMove-enter-from, .fadeMove-leave-to {
      transform: translateY(-90px);
    }
  }

  /*=========== Portrait phone design ============*/

  @media only screen and (max-width: 600px) {
    .ingColumn, .cocktailColumn {
      width: 100%;
      height: 33%;
    }
    .detailsColumn {
      width: 100%;
      height: 100%;
    }
    .cocktailColumn, .detailsColumn {
      border-left: unset;
      border-top: solid #f4b126;
    }
    .detailsDiv * {
      width: 90vw;
    }
    .detailsContent {
      margin-bottom: 25vh;
    }
    .uncheckBtn {
      width: 100vw;
      margin-top: 0
    }
  }
</style>