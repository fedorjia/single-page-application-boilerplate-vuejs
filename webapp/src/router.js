import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Cart from './views/Cart.vue';
Vue.use(Router);

const router = new Router({
    mode: 'history',
    // scrollBehavior (to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return { x: 0, y: 100 };
    //     }
    // },
    routes: [
        { path: '/home', component: Home }, // meta: {auth: 'no'}
        { path: '/cart', component: Cart },
        { path: '*', redirect: '/home' },
    ]
});

/***
 * global router before event
 */
router.beforeEach((to, from, next) => {
    // const auth = to.meta.auth || 'no';
    let index = -1;
    for(let i=0; i<window.views.length; i++) {
        const view = window.views[i];
        if(view.path === to.path) {
            // existed
            index = i;
            break;
        }
    }

    if(index === -1) {
        // push
        window.views.push({
            path: to.path
        });
        router.__state__ = 'push';
        // window.scrollTo(0, 0);

        if(!to.meta.transition) {
            to.meta.transition = 'slide-left';
        }
    } else {
        // pop
        window.views.splice(index+1, window.views.length-1-index);
        router.__state__ = 'pop';
        if(!to.meta.transition) {
            to.meta.transition = 'slide-right';
        }
    }

    // fix
    if(to.path === '/home') {
        window.views = [{ path: to.path }];
    }

    next();
});

export default router;
