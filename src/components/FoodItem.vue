<template>
  <div>
    <h2>
      {{ foodName }}
      <img src="/img_quality.svg" v-show="isFavorite">
    </h2>
    <p>{{ foodDesc }}</p>
    <button v-on:click="toggleFavorite">Favorite</button>
  </div>
</template>

<script>
  export default {
    props: ['foodName','foodDesc','isFavorite'],
    emits: ['toggle-favorite'],
    methods: {
      toggleFavorite() {
        this.$emit('toggle-Favorite', this.foodName);
      }
    }
  }
</script>

<style>
  img {
    height: 1.5em;
    float: right;
  }
</style>