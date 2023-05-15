import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home";
import ImageGallery from "../components/ImageGallery";
import ImageDetails from "../components/ImageDetails";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gallery',
    name: 'Image Gallery',
    component: ImageGallery,
    props: true
  },
  {
    path: '/image/:id',
    name: 'ImageDetails',
    component: ImageDetails,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
