<template>
  <div v-show="displayed" v-bind:class="{selClass: isSelected, greyedOutClass: greyedOut, specialClass: special}" @click="toggleSelected">
    <h4>{{ name }}</h4>
    <p>{{ degVal }}</p>
  </div>
</template>

<script>
export default {
  props: ['name','isSelected','displayed','greyedOut','special','degVal'],
  methods: {
    toggleSelected() {
      this.$emit('toggle-selected', this.name);
    }
  }
}
</script>

<style scoped>
  div {
    color: #494c50;
    width: fit-content;
    height: fit-content;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    margin: 10px;
    text-align: center;
  }
  p {
    font-size: smaller;
  }
  @media only screen and (max-width: 1000px) {
    div {
      padding: 2px;
      margin-top: 2px;
      border-radius: 10px;
      margin: 2px;
    }
  }
</style>