<template>
  <div>
    <h2>
      {{ foodName }}
      <img src="/img_quality.svg" v-show="foodIsFavorite">
    </h2>
    <p>{{ foodDesc }}</p>  
    <button v-on:click="toggleFavorite">Favorite</button>
  </div>
</template>

<script>
  export default {
    props: {
      foodName: {
        type: String,
        required: true
      },
      foodDesc: {
        type: String,
        required: false,
        default: 'This is the default description.',
        validator: function(value) {
          if( 20<value.length && value.length<100 ) {
            return true;
          }
          else {
            return false;
          }
        }
      },
      isFavorite: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    methods: {
        toggleFavorite() {
            this.foodIsFavorite = !this.foodIsFavorite;
        }
    },
    data() {
      return {
        foodIsFavorite: this.isFavorite
      }
    }
  }
</script>

<style>
  #red {
    font-weight: bold ;
    color: red;
  }
  img {
    height: 1.5em;
    float: right;
  }
</style>