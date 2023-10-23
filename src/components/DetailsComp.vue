<template>
  <div class="detailsContent" v-if="details">
    <h1>{{ cocktailName }} <span v-if="cocktailABV">({{ cocktailABV }}%)</span></h1>
    <div v-html="details"></div>
  </div>
</template>

<script>
export default {
  props: ['cocktailName', 'cocktailABV', 'details']
}
</script>

<style scoped>
</style>