<template>
  <div v-bind:style="{ backgroundColor: ingBg }" @click="toggleSelected" class="ing">
    <h2>{{ ingName }}</h2>
  </div>
</template>

<script>
export default {
    data() {
      return {
        ingBg: "#e4ebff"
      };
    },
  props: ['ingName','isSelected','ingBg'],
  methods: {
    toggleSelected() {
      this.$emit('toggle-selected', this.ingName);
    }
  }
};
</script>