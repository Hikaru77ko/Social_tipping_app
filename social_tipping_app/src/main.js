import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import firebase from 'firebase';
import config from './static/firebase.config.js';
import store from './store/store.js';

Vue.config.productionTip = false;

require('firebase/firestore');
firebase.initializeApp(config.firebaseConfig);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
