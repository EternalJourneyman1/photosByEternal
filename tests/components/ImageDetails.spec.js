// /* eslint-env jest */
//
// const { mount, createLocalVue } = require('@vue/test-utils');
// const VueRouter = require('vue-router');
// const Vuex = require('vuex');
// const ImageDetails = require('../../src/components/ImageDetails.vue').default;
//
// jest.mock('vue-analytics', () => ({
//     event: jest.fn()
// }))
//
// describe('ImageDetails.vue', () => {
//     let store
//     let router
//     let localVue
//     const imageId = '1'
//     const imageUrl = 'http://example.com/image.jpg'
//     const imageTags = ['tag1', 'tag2', 'tag3']
//
//     beforeEach(() => {
//         localVue = createLocalVue();
//         localVue.use(Vuex);
//         localVue.use(VueRouter);
//
//         // Create a Vuex store with the necessary getters and actions
//         store = new Vuex.Store({
//             getters: {
//                 getImageById: () => () => ({
//                     url: imageUrl,
//                     tags: imageTags
//                 })
//             },
//             actions: {
//                 fetchImage: jest.fn()
//             }
//         })
//
//         // Create a router with a route for our component
//         router = new VueRouter({
//             mode: 'abstract',
//             routes: [{path: '/image/:id', component: ImageDetails}]
//         })
//     })
//
//     it('displays loading image when image data is not ready', async () => {
//         // Set up the Vuex store to return null for the image
//         store.getters.getImageById = () => () => null
//
//         // Navigate to the route for our component
//         router.push(`/image/${imageId}`)
//
//         const wrapper = mount(ImageDetails, {
//             localVue,
//             store,
//             router
//         })
//
//         expect(wrapper.find('[alt="Loading"]').attributes('src')).toBe('loading.gif')
//     })
//
//     it('displays image and tags when given valid image id', async () => {
//         router.push(`/image/${imageId}`)
//
//         const wrapper = mount(ImageDetails, {
//             localVue,
//             store,
//             router
//         })
//
//         imageTags.forEach(tag => {
//             expect(wrapper.text()).toContain(tag)
//         })
//         expect(wrapper.find('[alt="Image"]').attributes('src')).toBe(imageUrl)
//     })
//
//     it('calls fetchImage action when image data is not ready', async () => {
//         // Set up the Vuex store to return null for the image
//         store.getters.getImageById = () => () => null
//
//         // Navigate to the route for our component
//         router.push(`/image/${imageId}`)
//
//         // Render the component
//         mount(ImageDetails, {
//             localVue,
//             store,
//             router
//         })
//
//         // Check that fetchImage action was called
//         expect(store.actions.fetchImage).toHaveBeenCalled()
//     })
// });
