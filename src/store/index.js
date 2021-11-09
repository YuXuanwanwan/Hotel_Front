import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import hotel from './modules/hotel'
import hotelManager from './modules/hotelManager'
import admin from './modules/admin'
import getters from './getters'
import marketer from './modules/marketer'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hotel,
    user,
    hotelManager,
    admin,
    marketer,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters
})
