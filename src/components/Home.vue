<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <ImageGallery :images="images" />
  </div>
</template>

<script>
import ImageGallery from './ImageGallery.vue';

export default {
  name: 'Home',
  data() {
    return {
      images: [
        { src: './photosByEternal_logo.png', alt: 'Image 1' },
        { src: './photosByEternal_logo.png', alt: 'Image 2' },
        // more images...
      ],
      msg: 'Welcome to PhotosByEternal'
    };
  },
  components: {
    ImageGallery
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
