import Vuex from 'vuex';
import axios from "axios";
import Vue from "vue";

const mutations = {
    setImage(state, image) {
        state.images.push(image);
    },
    setImages(state, images) {
        state.images = images;
    }
};
const actions = {
    apiUrl: () => process.env.VUE_APP_API_URL,
    fetchImages({ commit }) {
        return axios.get(`${actions.apiUrl()}`)
            .then(response => {
                const images = response.data;
                commit('setImages', images);
                return images;
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
    },
    fetchImage({ state, commit }, imageId) {
        const image = state.images.find(image => image.id === imageId);
        if (image) {
            return Promise.resolve(image);
        } else {
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


};
const getters = {
    getImages(state) {
        return state.images;
    },
    getImageById: state => id => {
        return state.images.find(image => image.public_id === id);
    }
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
