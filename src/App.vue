<template>
  <h1>Food</h1>
  <p>My favorite food has a diploma image attached to it.</p>
  <div id="wrapper">
    <food-item
      food-name="Apples"
      food-desc="Apples are a type of fruit that grow on trees."
      v-bind:is-favorite="false"/>
    <food-item
      food-name="Pizza"
      food-desc="Pizza has a bread base with tomato sauce, cheese, and toppings on top."
      v-bind:is-favorite="true"/>
    <food-item
      food-name="Rice"
      food-desc="Rice is a type of grain that people like to eat."
      v-bind:is-favorite="false"/>
  </div>
</template>

<script>
</script>

<style>
  body {
    background-color: #202124;
    color: aliceblue;
  }
  #wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  #wrapper > div {
    border: solid #494c50 1px;
    flex-basis: 120px;
    margin: 10px;
    padding: 10px;
    background-color: #292a2d;
  }
  #app > div:hover {
  cursor: pointer;
}
</style>
