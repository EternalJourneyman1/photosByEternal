<template>
  <div class="imagedetails-container">
    <div class="image-container">
      <template v-if="image">
        <img :src="image.url" alt="Image" class="responsive-image" @contextmenu="disableContextMenu"/>
      </template>
      <template v-else>
        <img src="../assets/loading.gif" alt="Loading" class="responsive-image" style="background-color: black"/>
      </template>
    </div>
    <div class="tags-container">
      <template v-if="image && image.tags && image.tags.length">
        <div v-for="tag in image.tags" :key="tag" class="tag">
          {{ tag }}
        </div>
      </template>
      <template v-else>
        <div class="tag">
          No Tag
        </div>
      </template>
    </div>
  </div>
</template>


<script>
import store from "@/store/store";


export default {
  name: 'ImageDetails',
  methods: {
    disableContextMenu(event) {
      event.preventDefault();
    },
    trackImageView() {
      // Track a custom event for image view
      this.$ga.event({
        eventCategory: 'Image',
        eventAction: 'View',
        eventLabel: this.$route.params.id
      });
    }
  },
  computed: {
    image() {
      const imageId = this.$route.params.id;
      const image = this.$store.getters.getImageById(imageId);
      return image ? image : null;
    }
  },
  created() {
    const imageId = this.$route.params.id;
    this.trackImageView();
    if (!this.image) {
      store.dispatch('fetchImage', imageId)
          .catch(error => {
            console.error(error);
          });
    }
  }
};
</script>

<style scoped>
.imagedetails-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;


}

.responsive-image {
  max-width: 100%;
  max-height: 100%;
  height: auto;
}

.tags-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.tag {
  background-color: #42b983;
  color: #fff;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 0 5px;
}

</style>
