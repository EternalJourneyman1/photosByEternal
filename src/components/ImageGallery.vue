<template>
  <div class="image-gallery">
    <div class="image-item" v-for="(image, index) in images" :key="index">
      <img :src="image.url" :alt="image.public_id" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ImageGallery",
  data() {
    return {
      images: []
    }
  },
  created() {
    axios.get('http://localhost:8080/images')
        .then(response => {
          this.images = response.data;
        })
        .catch(error => {
          console.error(error);
        });
  }
};
</script>

<style scoped>
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1em;
}

.image-item img {
  width: 400px;
  height: 400px;
}
</style>
