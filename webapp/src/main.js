import 'babel-polyfill';

import Vue from 'vue';

import App from './views/App';
import store from './store';
import router from './router';
import extension from './utils/extension';

extension();

/******************************************************
 *  Global Variables
 *******************************************************/
let env = process.env.NODE_ENV;
if (!env) {
    env = 'production';
}
window.views = [];
window.router = router;
window.$refs = {};

// start app
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
