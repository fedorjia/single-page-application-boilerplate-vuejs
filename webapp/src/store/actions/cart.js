import { cart } from '../types';
import cartStore from '../../commons/cart-store';
// import http from '../../utils/http';

export default {
    /***
     * register
     */
    [cart.ADD_PRODUCT] ({ commit }, item) {
        cartStore.increase({...item});
		commit(cart.LOAD_DATA);
    },

    [cart.REDUCE_PRODUCT] ({ commit }, item) {
        cartStore.decrease({...item});
		commit(cart.LOAD_DATA);
    }
};
