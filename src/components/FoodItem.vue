<template>
  <div v-on:click="countClicks(+1)"
        v-on:click.right.prevent="countClicks(-1)">
    <h2>
      {{ foodName }}
      <img src="/img_quality.svg" v-show="isFavorite">
    </h2>
    <p>{{ foodDesc }}</p>  
    <p id="red">{{ clicks }}</p>
  </div>
</template>

<script>
  export default {
    props: [
      'foodName',
      'foodDesc'
    ],
    data() {
      return {
        clicks: 0
      }
    },
    methods: {
      countClicks(val) {
        this.clicks+=val;
      }
    }
  }
</script>

<style>
  #red {
    font-weight: bold ;
    color: rgb(144, 12, 12);
  }
</style>