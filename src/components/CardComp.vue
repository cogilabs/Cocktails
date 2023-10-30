<template>
  <div v-show="displayed" v-bind:class="{selClass: isSelected, greyedOutClass: greyedOut, specialClass: special}" @click="toggleSelected">
    <h4>{{ name }}</h4>
    <p>{{ abvScore }}</p>
  </div>
</template>

<script>
export default {
  props: ['name','isSelected','displayed','greyedOut','special','abvScore','type'],
  methods: {
    // Emit an event to notify parent component about selection status change
    toggleSelected() {
      this.$emit('toggle-selected', this.type, this.name);
    }
  }
}
</script>

<style scoped>
  div {
    /* Styles for the card */
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
    /* Styles for the text within the card */
    font-size: smaller;
  }

  /*=========== Tablet/landscape phone design ============*/
  
  @media only screen and (max-width: 1000px) {
    div {
      padding: 2px;
      margin-top: 2px;
      border-radius: 10px;
      margin: 2px;
    }
  }
</style>