import { cart } from '../types';
import actions from '../actions/cart';
import cartStore from '../../commons/cart-store';

// initial state
const state = {
    items: []
};
const initialState = Object.assign({}, state);

// mutations
const mutations = {
    /**
     * reset state
     */
    [cart.RESET] (state) {
        Object.assign(state, initialState);
    },

    /**
     * data items
     */
    [cart.LOAD_DATA] (state) {
        state.items = cartStore.get();
    }
};

export default {
    state,
    mutations,
    actions: { ...actions }
};
