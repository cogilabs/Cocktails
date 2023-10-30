<template>
    <div>
      <h2>Cocktail Details</h2>
      <p>Cocktail ID: {{ $route.params.id }}</p>
      <!-- Fetch and display cocktail details using the ID -->
    </div>
  </template>
  
  <script>
  export default {
    created() {
      // Fetch cocktail details using this.$route.params.id
    }
  }
  </script>