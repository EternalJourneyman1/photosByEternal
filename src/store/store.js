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
    // apiUrl: process.env.VUE_APP_API_URL + '/images',
    apiUrl: () => process.env.VUE_APP_API_URL,
    fetchImages({commit}) {
        return axios.get(`${actions.apiUrl()}/images`)
            .then(response => {
                const images = response.data.map(image => {
                    const tags = image.tags || [];
                    console.log("heres my tags ", tags);
                    return { ...image, tags };
                });
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
            return axios.get(`${actions.apiUrl()}/${imageId}`)
                .then(response => {
                    const image = response.data;
                    const tags = image.tags || [];
                    console.log("heres my tags ", tags);
                    const imageWithTags = { ...image, tags };
                    commit('setImage', imageWithTags);
                    return imageWithTags;
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
