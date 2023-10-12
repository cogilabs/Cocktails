<template>
  <div>
    <h2>{{ cocktailName }}</h2>
  </div>
</template>

<script>
export default {
  props: [
    'cocktailName'
  ]
}
</script>

<style scoped>
  div {
    background-color: #dde0e7;
    box-shadow: 0 5px 6px 0 rgba(0,0,0,0.2);
    color: #828589;
    width: 150px;
    height: 70px;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    margin: 10px;
  }
</style>