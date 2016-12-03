import Vue from 'vue';
import Vuex from 'vuex';

import home from './modules/home';
import cart from './modules/cart';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    modules: {
        home,
        cart
    }
});
