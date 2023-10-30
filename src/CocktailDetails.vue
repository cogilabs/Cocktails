<template>
  <div>
    <div v-if="cocktail">
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
        if (this.$route.params.id == i) {
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
