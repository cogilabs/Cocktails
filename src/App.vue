<template>
  <h3>Todo List</h3>  
  <ul>
    <todo-item
      v-for="x in items"
      :key="x"
      :item-name="x"
      style="background-color: #292a2d;"
    />
  </ul>
  <input v-model="newItem">
  <button @click="addItem">Add</button>
</template>

<script>
  export default {
    data() {
      return {
        newItem: '',
        items: ['Buy apples','Make pizza','Mow the lawn']
      };
    },
    methods: {
      addItem() {
        this.items.push(this.newItem),
        this.newItem = '';
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
