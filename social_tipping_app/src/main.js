import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase';
import config from './static/firebase.config.js';
import store from './store/index.js';

Vue.config.productionTip = false;

firebase.initializeApp(config.firebaseConfig);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
