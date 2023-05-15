<template>
  <div class="home">
    <ImageGallery />
  </div>
</template>

<script>
import ImageGallery from './ImageGallery.vue';

export default {
  name: 'Home',
  components: {
    ImageGallery
  },
  metaInfo() {
    return {
      // Set the cache duration for the meta tags
      meta: [
        {
          vmid: 'cache-control',
          httpEquiv: 'Cache-Control',
          content: `max-age=${this.$route.meta.cacheDuration}`,
        },
        {
          vmid: 'expires',
          httpEquiv: 'Expires',
          content: new Date(Date.now() + this.$route.meta.cacheDuration * 1000).toUTCString(),
        },
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    // Check if the component should be cached
    if (to.meta.cacheDuration && from.meta.cacheKey === to.meta.cacheKey) {
      // Component should be cached, skip fetching data
      next(vm => {
        // Update the meta tags with cache headers
        vm.$meta().refresh();
      });
    } else {
      // Component should not be cached, proceed with fetching data
      next();
    }
  },
}
</script>