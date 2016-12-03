import { home } from '../types';
import actions from '../actions/home';

// initial state
const state = {
    error: undefined,
    items: [],
    isLoading: false
};
const initialState = Object.assign({}, state);

// mutations
const mutations = {
    /**
     * reset state
     */
    [home.RESET] (state) {
        Object.assign(state, initialState);
    },

    /**
     * data items
     */
    [home.DATA_ERROR] (state, error) {
        state.error = error;
    },
    [home.DATA_RECEIVED] (state, items) {
        for(const item of items) {
            state.items.push(item);
        }
    },
};

export default {
    state,
    mutations,
    actions: { ...actions }
};
