import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: "http://127.0.0.1:8000/api",
    reseaux: null,
    item: null,
    info_shown: false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
