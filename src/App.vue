<template>
  <h1>Food</h1>
  <p>Food items are generated with v-for from the 'foods' array.</p>
  <div id="wrapper">
    <food-item
      v-for="x in foods"
      :key="x.name"
      :food-name="x.name"
      :food-desc="x.desc"
      :is-favorite="x.favorite"
      @toggle-favorite="receiveEmit"
      />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        foods: [
          { name: 'Apples',
            desc: 'Apples are a type of fruit that grow on trees.',
            favorite: true },
          { name: 'Pizza',
            desc: 'Pizza has a bread base with tomato sauce, cheese, and toppings on top.',
            favorite: false },
          { name: 'Rice',
            desc: 'Rice is a type of grain that people like to eat.',
            favorite: false },
          { name: 'Fish',
            desc: 'Fish is an animal that lives in water.',
            favorite: true },
          { name: 'Cake',
            desc: 'Cake is something sweet that tastes good.',
            favorite: false }
        ]
      };
    },
    methods: {
      receiveEmit(foodId) {
        const foundFood = this.foods.find(
          food => food.name === foodId
        );
        foundFood.favorite = !foundFood.favorite;
      }
    }
  }
</script>

<style>
  body {
    background-color: #202124;
    color: aliceblue;
    font-family: Helvetica, Arial, sans-serif;
  }
  #wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  #wrapper > div {
    border: solid #494c50 1px;
    color: #9aa0a6;
    flex-basis: 120px;
    margin: 10px;
    padding: 10px;
    background-color: #292a2d;
  }
</style>
