<template>
  <div class="detailsContent" v-if="detailsText">
    <h1>{{ cocktailName }} <span v-if="cocktailABV">({{ cocktailABV }}%)</span></h1>
    <p class="img"><img v-show="imgUrl" v-bind:src="imgUrl"></p>
    <div v-html="detailsText"></div>
    <router-link :to="'/cocktail/' + cocktailName">View Details</router-link>
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
  created() {
    // Load the image when component updates
    this.loadImage();
  },
  updated() {
    // Load the image when component updates
    this.loadImage();
  },
  methods: {
    // Load the cocktail image
    async loadImage() {
      try {
        const imageUrl = await this.getImageUrl(this.cocktailName);
        console.log(imageUrl)
        this.imgUrl = imageUrl;
      } catch (error) {
        console.error('Error loading image:', error);
      }
    },

    async getImageUrl(cocktailId) {
      if (cocktailId === "") return null;
      const loadImage = async (imageType) => {
        const response = await fetch(`/images/cocktails/${cocktailId}.${imageType}`);
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
    /* Styles for the image container */
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  img {
    /* Styles for the image */
    max-width: 45%;
  }
</style>