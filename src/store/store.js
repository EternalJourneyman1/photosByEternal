import Vuex from 'vuex';
import axios from "axios";
import Vue from "vue";

const mutations = {
    setImage(state, image) {
        const existingImageIndex = state.images.findIndex(img => img.public_id === image.public_id);
        if (existingImageIndex !== -1) {
            state.images.splice(existingImageIndex, 1, image);
        } else {
            state.images.push(image);
        }
    },
    setImages(state, images) {
        state.images = images.map(image => {
            // Add or update tags for each image
            const existingImage = state.images.find(img => img.public_id === image.public_id);
            if (existingImage) {
                existingImage.tags = image.tags;
                return existingImage;
            } else {
                return image;
            }
        });
    }
};


const actions = {
    apiUrl: () => {
        const app_url = process.env.VUE_APP_API_URL
        console.log(app_url)
        return app_url
    },
    fetchImages({commit}) {
        return axios.get(`${actions.apiUrl()}`)
            .then(response => {
                const images = response.data;
                console.table(response.data)
                commit('setImages', images);
                return images;
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
    },
    fetchImage({state, commit}, imageId) {
        return axios
            .get(`${actions.apiUrl()}/${imageId}`)
            .then(response => {
                const fetchedImage = response.data;
                commit('setImage', fetchedImage);
                return fetchedImage;
            })
            .then(fetchedImage => {
                // Wait for the image to be stored in the state
                return new Promise(resolve => {
                    const checkImage = () => {
                        const storedImage = state.images.find(image => image.id === fetchedImage.id);
                        if (storedImage) {
                            resolve(storedImage);
                        } else {
                            setTimeout(checkImage, 100);
                        }
                    };
                    checkImage();
                });
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
    }
}

const getters = {
    getImages(state) {
        return state.images;
    },
    getImageById: (state) => id => {
        const image = state.images.find(image => image.public_id === id);
        return image ? image : null;
    },

};


const state = {
    images: [],
};

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
