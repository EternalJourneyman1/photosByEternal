<template>
  <div class="image-gallery">
    <div class="image-item" v-for="(image, index) in images" :key="index" @click="toggleOverlay(index)">
      <img :src="image.url" :alt="image.public_id" @contextmenu="disableContextMenu" />
      <div class="overlay" v-show="currentOverlay === index">
        <router-link :to="{ name: 'ImageDetails', params: { id: image.public_id, url: image.url }}" class="view-btn" @click.native.stop="selectImage(image, index)">View</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";

export default {
  name: "ImageGallery",
  data() {
    return {
      currentOverlay: null,
      selectedImage: null,
    };
  },
  computed: {
    images() {
      return store.getters.getImages;
    },
  },
  methods: {
    disableContextMenu(event) {
      event.preventDefault();
    },
    toggleOverlay(index) {
      this.currentOverlay = this.currentOverlay === index ? null : index;
    },
    selectImage(image, index) {
      this.selectedImage = image;
      // Track a custom event
      this.$ga.event({
        eventCategory: 'Image',
        eventAction: 'View',
        eventLabel: image.public_id,
      });
      this.$router.push({
        path: `/image/${image.public_id}`,
        query: { selectedImageIndex: index },
      });
    },
  },
  created() {
    const selectedImageIndex = this.$route.query.selectedImageIndex;
    if (selectedImageIndex !== undefined) {
      this.currentOverlay = selectedImageIndex;
    }

    this.$ga.event({
      eventCategory: 'Image',
      eventAction: 'Gallery Load',
    });

    if (this.images.length <= 1) {
      store.dispatch('fetchImages')
          .catch(error => {
            console.error(error);
          });
    }
  },
};
</script>

<style scoped>
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1em;
  justify-content: center;
}

@media (max-width: 435px) {
  .image-gallery {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}

.image-item {
  position: relative;
  width: 200px;
  height: 200px;
}

.image-item img {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.view-btn {
  padding: 10px 20px;
  color: white;
  background: #42b983;
  border: none;
  cursor: pointer;
}
</style>
