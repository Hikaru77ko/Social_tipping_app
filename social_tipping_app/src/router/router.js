import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Registration from '../views/Registration.vue';
import Dashboard from '../views/Dashboard.vue';
import store from '../store/store.js';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Registration',
            component: Registration,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            beforeEnter(to, from, next) {
                if (store.getters.uid) {
                    next();
                } else {
                    next('/login');
                }
            },
        },
    ],
});
