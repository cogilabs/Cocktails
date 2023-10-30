<template>
  <div class="detailsContent" v-if="detailsText">
    <h1>{{ cocktailName }} <span v-if="cocktailABV">({{ cocktailABV }}%)</span></h1>
    <p class="img"><img v-show="imgUrl" v-bind:src="imgUrl"></p>
    <div v-html="detailsText"></div>
  </div>
</template>

<script>
export default {
  props: ['cocktailName', 'cocktailABV', 'detailsText'],
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
      const loadImage = async (imageType) => {
        const response = await fetch(`images/cocktails/${cocktailId}.${imageType}`);
        if (response.status === 200) {
          return response.url;
        }
      };
      const imageTypes = ['jpg', 'jpeg', 'png'];
      for (const imageType of imageTypes) {
        const imageUrl = await loadImage(imageType);
        if (imageUrl) {
          return imageUrl;
        }
      }
      console.error('No image found for', cocktailId);
      return null;
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
    max-width: 45%;
  }
</style>