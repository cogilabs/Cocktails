<template>
  <div class="cadre">
    <div v-if="cocktail">
    <router-link :to="'/'">Retour à l'application</router-link>
      <div>
        <details-comp 
            :cocktailName="cocktail.name"
            :cocktailABV="cocktail.abv"
            :detailsText="cocktail.description"
          />
      </div>
    </div>
  </div>
</template>

<script>
import App from './App.vue';
import CardComp from './components/CardComp.vue';
import DetailsComp from './components/DetailsComp.vue';
import LegendComp from './components/LegendComp.vue';

export default {
  data() {
    return {
      cocktail: null
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      // Fetch cocktail data from a JSON file and populate ingredient and cocktail lists
      const response = await fetch("/cocktails.json");
      const json = await response.json();
      for (const i in json) {
        // Populate cocktailList with data from the JSON file
        if (this.$route.params.id == i.replace(/ /g,'').toLowerCase()) {
          this.cocktail = {
            name: i, 
            description: json[i].description,
            abv: json[i].abv,
          };
        }
      }
    }
  },
  components: {
    App,
    CardComp,
    DetailsComp,
    LegendComp,
  }
};
</script>

<style scoped>
div.cadre {
  background-color: #ede4d1;
  color: black;
  padding: 15px 20px;
  width: 70%;
  border-color: #707070;
  border-style: ridge;
  border-radius: 10px;
  margin-top: 5vh;
  margin-left: auto;
  margin-right: auto;
}
div.cadre *::selection {
  background: goldenrod;
}

.cadre a {
  text-decoration: none;
  color: #408284;
}
.cadre a:hover {
  text-decoration: underline;
}

@media only screen and (max-width: 1300px) {
  div.cadre {
    width: 88%;
  }
}
</style>
