import home from '@/api/home'
// import * as types from '@/store/mutation-types'
import homeTypes from './types'

/*****************
 * initial state
 *****************/
const state = {
  items: []
}

/******************
 * getters
 ******************/
const getters = {
  gItems: (state) => {
    const items = state.items
    const newItems = []
    for (let item of items) {
      newItems.push(item + '-getter')
    }
    return newItems
  }
}

/*******************
 * actions
 *******************/
const actions = {
  async [homeTypes.LOAD] ({commit}) {
    const items = await home.load()
    commit(homeTypes.LOAD_SUCCESS, {items})
  }
}

/*******************
 * mutations
 *******************/
const mutations = {
  [homeTypes.LOAD_SUCCESS] (state, {items}) {
    state.items = items
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
