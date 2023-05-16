<template>
  <div class="image-gallery-container">
    <div class="image-gallery">
      <div class="image-item" v-for="(image, index) in images" :key="index" @click="toggleOverlay(index)">
        <img :src="image.url" :alt="image.public_id" @contextmenu="disableContextMenu"/>
        <div class="overlay" v-show="currentOverlay === index">
          <router-link :to="{ name: 'ImageDetails', params: { id: image.public_id, url: image.url }}" class="view-btn"
                       @click.native.stop="selectImage(image, index)">View
          </router-link>
        </div>
      </div>
    </div>
    <div id="content">
      <router-view/>
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    disableContextMenu(event) {
      event.preventDefault();
    },
    toggleOverlay(index) {
      this.currentOverlay = this.currentOverlay === index ? null : index;
    },
    isPartiallyHidden(index) {
      const imageElement = document.getElementsByClassName('image-item')[index];
      const rect = imageElement.getBoundingClientRect();
      const navHeight = document.getElementById('nav').offsetHeight;
      const imageHeight = rect.bottom - rect.top;
      const visibleHeight = Math.min(window.innerHeight - navHeight, rect.bottom) - Math.max(navHeight, rect.top);
      const visibilityRatio = visibleHeight / imageHeight;
      return visibilityRatio < 0.4;
    },
    selectImage(image, index) {
      if (!this.isPartiallyHidden(index)) {
        this.selectedImage = image;
        this.$ga.event({
          eventCategory: 'Image',
          eventAction: 'View',
          eventLabel: image.public_id,
        });
        this.$router.push({
          path: `/image/${image.public_id}`,
          query: {selectedImageIndex: index},
        });
      }
    }
    ,
    handleScroll() {
      const images = document.querySelectorAll('.image-item');
      const navHeight = document.getElementById('nav').offsetHeight;

      images.forEach((image) => {
        const rect = image.getBoundingClientRect();
        const isVisible = rect.top >= navHeight && rect.bottom <= window.innerHeight;

        if (!isVisible) {
          image.classList.add('partially-hidden');
        } else {
          image.classList.remove('partially-hidden');
        }
      });
    }
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


#content {
  margin-top: 100px;
}

@media (max-width: 435px) {
  .image-gallery-container {
    overflow-y: auto;
    height: calc(100vh - 100px);
  }

  .image-gallery {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}

.image-item {
  position: relative;
  width: 200px;
  height: 200px;
  pointer-events: auto;
}

.image-item.partially-hidden {
  pointer-events: none;
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
