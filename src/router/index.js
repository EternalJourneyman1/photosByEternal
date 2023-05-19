import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home";
import ImageGallery from "../components/ImageGallery";
import ImageDetails from "../components/ImageDetails";
import Contact from "../components/Contact";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      cacheKey: 'home', // Unique cache key for each route
      cacheDuration: 3600, // Cache duration in seconds (1 hour)
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/gallery',
    name: 'Image Gallery',
    component: ImageGallery,
    props: true,
    meta: {
      cacheKey: 'gallery',
      cacheDuration: 3600,
    },
  },
  {
    path: '/image/:id',
    name: 'ImageDetails',
    component: ImageDetails,
    props: true,
    meta: {
      cacheKey: 'gallery',
      cacheDuration: 3600,
    },
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
