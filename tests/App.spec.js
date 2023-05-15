// import { createLocalVue, mount } from '@vue/test-utils';
// import VueRouter from 'vue-router';
// import Vuex from 'vuex';
// import App from '@/App.vue'; // replace with actual path to App.vue
//
// const localVue = createLocalVue();
// localVue.use(VueRouter);
// localVue.use(Vuex);
//
// const routes = [
//     { path: '/', name: 'Home' },
//     { path: '/image/:id', name: 'ImageDetails' },
// ];
//
// describe('App.vue', () => {
//     let store;
//
//     beforeEach(() => {
//         store = new Vuex.Store({
//             // Mock your store or import it
//         });
//     });
//
//     it('does not show the back button on the home page', () => {
//         const router = new VueRouter({
//             mode: 'abstract', // this mode won't change the URL
//             routes,
//         });
//
//         const wrapper = mount(App, {
//             localVue,
//             store,
//             router,
//         });
//
//         router.push('/');
//
//         expect(wrapper.find('#back-button').exists()).toBe(false);
//     });
//
//     it('shows the back button on the image details page after navigation', async () => {
//         const router = new VueRouter({
//             mode: 'abstract',
//             routes,
//         });
//
//         const wrapper = mount(App, {
//             localVue,
//             store,
//             router,
//         });
//
//         await router.push('/image/1');
//
//         expect(wrapper.find('#back-button').exists()).toBe(true);
//     });
// });
