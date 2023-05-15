import Vue from "vue";
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS_ID,
})