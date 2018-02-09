import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import home from '@/container/home/module'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
  state,
  actions,
  modules: {
    home
  },
  strict: debug
})
