<template>
  <div>
    <!-- Add the template for YourComponentWithIngredientSearch here -->
    <div>
      <router-link to="/cocktails/1">View Cocktail 1</router-link>
      <router-link to="/cocktails/2">View Cocktail 2</router-link>
      <!-- Add more links for your cocktails as needed -->
    </div>
    <!-- Use your old components here -->
    <App />
    <CardComp />
    <DetailsComp />
    <LegendComp />
  </div>
</template>

<script>
import App from '../App.vue';
import CardComp from './CardComp.vue';
import DetailsComp from './DetailsComp.vue';
import LegendComp from './LegendComp.vue';

export default {
  name: 'YourComponentWithIngredientSearch',
  components: {
    App,
    CardComp,
    DetailsComp,
    LegendComp,
  },
  // Add your component logic here
}
</script>

<style scoped>
  /* Add component-specific styles here */
</style>
