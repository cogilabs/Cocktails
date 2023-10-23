<template>
  <div class="detailsContent" v-if="details">
    <h1>{{ cocktailName }} <span v-if="cocktailABV">({{ cocktailABV }}%)</span></h1>
    <p class="img"><img v-show="imgUrl" v-bind:src="imgUrl"></p>
    <div v-html="details"></div>
  </div>
</template>

<script>
export default {
  props: ['cocktailName', 'cocktailABV', 'details'],
  data() {
    return {
      imgUrl: null,
    };
  },
  updated() {
    this.loadImage();
  },
  methods: {
    async loadImage() {
      try {
        const imageUrl = await this.getImageUrl(this.cocktailName);
        this.imgUrl = imageUrl;
      } catch (error) {
        console.error('Error loading image:', error);
      }
    },
    async getImageUrl(cocktailId) {
      if (cocktailId === "") return null;
      let response = await fetch("images/cocktails/" + cocktailId + ".png");
      if (response.status === 200) {
        return response.url;
      } else {
        response = await fetch("images/cocktails/" + cocktailId + ".jpg");
        if (response.status === 200) {
          return response.url;
        } else return null;
      }
    }
  }
}
</script>

<style scoped>
  .img {    
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  img {
    width: 30%;
  }
</style>