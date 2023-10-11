<template>
  <p>Choose what part of this page you want to see:</p>
  <router-link to="/animals">Animals</router-link>
  <router-link to="/food">Food</router-link><br>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  a {
    display: inline-block;
    background-color: black;
    border: solid 1px black;
    color: white;
    padding: 5px;
    margin: 10px;
  }
  a:hover,
  a.router-link-active {
    background-color: rgb(110, 79, 13);
  }
  div {
    border: dashed white 1px;
    padding: 20px;
    margin: 10px;
    display: inline-block;
  }
</style>            

<style>
  body {
    background-color: #202124;
    color: aliceblue;
    font-family: Helvetica, Arial, sans-serif;
  }
  #dataDiv {
    border: solid #494c50 1px;
    color: #9aa0a6;
    width: 240px;
    padding: 10px;
    margin-top: 10px;
    background-color: #292a2d;
  }
  #dataDiv > img {
    width: 100%;
  }
</style>
