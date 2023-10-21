<template>
  <div class="master">
    <div class="ing">
        <div class="sectionTitle">
          <h1>Ingrédients</h1>
        </div>
      <input type="text" v-model="ingSearch" v-on:input="reListIngs(ingSearch)" placeholder="Entrez un ingrédient">
      <div class="ingInt">
        <transition-group name="fade">
          <card-comp 
            v-for="x in ings"
            :key="'ingredientSel-' + x.name"
            :name="x.name"
            :displayed="(x.displayed && x.isSelected)"
            :is-selected="x.isSelected"
            @toggle-selected="receiveEmit"
          />
        </transition-group>
      </div>
      <div class="ingInt">
        <transition-group name="fade">
          <card-comp 
            v-for="x in ings"
            :key="'ingredient-' + x.name"
            :name="x.name"
            :displayed="x.displayed && !x.isSelected"
            :is-selected="x.isSelected"
            @toggle-selected="receiveEmit"
          />
        </transition-group>
      </div>
    </div>
    <div class="cocktail">
        <div class="sectionTitle">
          <h1>Cocktails</h1>
        </div>
        <input type="text" v-if="selectedIngsComp == 0" v-model="cocktailSearch" v-on:input="listCocktails(cocktailSearch)" placeholder="Entrez un cocktail">
      <div class="cocktailInt">
        <transition-group name="fade">
          <card-comp 
            v-for="x in cocktails"
            :key="'cocktail-' + x.name"
            :name="x.name"
            :displayed="x.displayed"
            :special="x.special"
            :is-selected="x.isSelected"
            :deg-val="x.degVal"
            @toggle-selected="receiveEmit"
          />
        </transition-group>
      </div>
      <div>
        <transition-group name="fade">
          <card-comp 
            v-for="x in cocktails"
            :key="'cocktailGreyedOut-' + x.name"
            :name="x.name"
            :displayed="!(x.displayed)"
            :greyedOut="!(x.displayed)"
            :is-selected="x.isSelected"
            :deg-val="x.degVal"
            @toggle-selected="receiveEmit"
          />
        </transition-group>
      </div>
    </div>
    <div class="details">
        <div class="sectionTitle">
          <h1>Détails et recette</h1>
        </div>
      <div class="detailsInt">
        <transition name="fade">
        <details-comp 
          v-if="details"
          :details="details"
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
        ings: [],
        cocktails: [],
        details: "",
        ingSearch: "",
        cocktailSearch: ""
      };
    },
    mounted() {
      this.fetchData();
    },
    computed: {
      selectedIngsComp() {
        const selectedIngs = new Array();
        for (const i in this.ings) {
          if (this.ings[i].isSelected == true) {
            selectedIngs.push(this.ings[i].name)
          }
        }
        console.log(selectedIngs.length)
        return selectedIngs.length;
      }
    },
    methods: {
      async fetchData() {
        const response = await fetch("cocktails.json");
        const json = await response.json();
        const ingList = new Array();
        let h = 0
        for (const i in json) {
          this.cocktails.push({
            name: i, 
            isSelected: false, 
            ingredients: json[i].ingredients, 
            description: json[i].description,
            degree: json[i].degree,
            displayed: true,
            special: true,
            degVal: "",
          });
          if (parseInt(this.cocktails[h].degree) > 0) {
            var score = "";
            for (let j = 0; j < json[i].degree/20; j++) {
              score = score + "🍹"
            }
            this.cocktails[h].degVal = score
          }
          h++
          this.cocktails.sort((a, b) => {
            return (a.name).localeCompare(b.name);
          });
          for (const j in json[i].ingredients) {
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
          this.ings.push({
            name: ingList[i], 
            isSelected: false, 
            displayed: true
          });
        }
        this.ings.sort((a, b) => {
          return (a.name).localeCompare(b.name);
        });
      },
      receiveEmit(divId) {
        this.ingSearch = ""
        this.cocktailSearch = ""
        let isCocktail = false;
        let foundObject = this.ings.find(
          ing => ing.name === divId
        );
        if (foundObject == undefined) {
          foundObject = this.cocktails.find(
            cocktail => cocktail.name === divId
          );
          isCocktail = true;
        }
        if (foundObject.displayed) foundObject.isSelected = !foundObject.isSelected;
        if (isCocktail) {
          for (const i in this.cocktails) {
            if (this.cocktails[i] != foundObject) {
              this.cocktails[i].isSelected = false;
            }
          }
          if (foundObject.isSelected){
            this.details = foundObject.description
          } else {
            this.details = ""
          }
        } else {
          for (const i in this.cocktails) {
            if (!this.cocktails[i].displayed) {
              if (this.cocktails[i].isSelected == true) {
                this.details = "";
              }
              this.cocktails[i].isSelected = false;
            }
          }
        }
        this.listCocktails();
          for (const i in this.cocktails) {
            if (!this.cocktails[i].displayed) {
              if (this.cocktails[i].isSelected == true) {
                this.details = "";
              }
            }
          }
      },
      listCocktails(searchParams) {
        if (searchParams) {
          const allCocktails = new Array();
          for (const i in this.cocktails) {
            this.cocktails[i].displayed = false;
            allCocktails.push(this.cocktails[i].name)
          }
          for (const i in allCocktails) {
            if (allCocktails[i].toLowerCase().includes(searchParams.toLowerCase())) {
              this.cocktails[i].displayed = true
            }
          }
          return
        }
        let checker = (arr, target) => target.every(v => arr.includes(v));
        const selectedIngs = new Array();
        const possibleCocktails = new Array();
        for (const i in this.ings) {
          if (this.ings[i].isSelected == true) {
            selectedIngs.push(this.ings[i].name)
            for (const j in this.cocktails) {
              if (this.cocktails[j].degree > 0) {
                if (parseInt(this.cocktails[j].degree) > 0) {
                  var score = "";
                  for (let j = 0; j < this.cocktails[j].degree/20; j++) {
                    score = score + "🍹"
                  }
                  this.cocktails[j].degVal = score
                }
              }
              if (this.cocktails[j].ingredients.includes(this.ings[i].name)) {
                possibleCocktails.push(this.cocktails[j].name)
              }
            }
          }
        }
        for (const i in this.cocktails) {
          this.cocktails[i].special = false
          this.cocktails[i].displayed = (checker(this.cocktails[i].ingredients, selectedIngs) || possibleCocktails.includes(this.cocktails[i].name))
          if (selectedIngs.length != 0) {
            if (!(checker(this.cocktails[i].ingredients, selectedIngs))) {
              this.cocktails[i].special = possibleCocktails.includes(this.cocktails[i].name)
            }
          } else { 
            this.cocktails[i].special = true
          }
        }

        this.reListIngs()
      },
      reListIngs(searchParams) {
        if (!searchParams) {
          searchParams = ""
        }
        const allIngs = new Array();
        for (const i in this.ings) {
          this.ings[i].displayed = false;
          allIngs.push(this.ings[i].name)
        }
        for (const i in allIngs) {
          if (allIngs[i].toLowerCase().includes(searchParams.toLowerCase())) {
            this.ings[i].displayed = true
          }
        }
      }
    }
  }
</script>      

<style>
  body {
    background-image: url(https://cogilabs.eu/Images/Pinstripe2.png);
    background-repeat: repeat;
    background-color: #18222c;
    color: whitesmoke;
    font-family: Helvetica, Arial, sans-serif;
    margin: 0;
  }
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
    width: 60%;
    background-color: #423d32;
    margin: 0;
    padding: 10px;
    border-radius: 10px;
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
    align-content: flex-start;
    height: 100%;
    overflow-y: auto;
  }
  .cocktail, .details {
    border-left: solid #f4b126;
  }
  .ing > div, .cocktail > div, .details > div {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: fit-content;
  }
  .ingInt > div {
    max-width: 120px;
  }
  .cocktailInt > div {
    max-width: 150px;
  }
  .cocktailInt > div > h4 {
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }
  .ingInt > div:not(.selClass) {
    background-color: #ede4d1;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2)
  }
  .cocktailInt > div:not(.selClass):not(.specialClass) {
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
  }
  .specialClass:not(.selClass) {
    background-color: #ede4d1;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
  }
  .cocktailInt > div:hover, .ingInt > div:hover {
    cursor: pointer;
  }
  input {
    height: fit-content;
    width: 30vw;
    margin-top: 10px
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

  #dotsAndLinesCanvas {
    position: fixed;
    left:0;
    top:0;
    z-index:-1;
    width: 100%;
    height: 100%;
  }
</style>