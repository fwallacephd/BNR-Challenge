import Vue from 'vue';
import Vuex from 'vuex';
import Blog from './modules/blog'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Blog
  },
});

export default store;
