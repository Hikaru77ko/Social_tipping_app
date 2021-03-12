import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Registration from '../views/Registration.vue';
import Dashboard from '../views/Dashboard.vue';
import store from '../store/store.js';

Vue.use(VueRouter);

const routes = [
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
        beforEnter(to, from, next) {
            if (store.getters.uid) {
                next();
            } else {
                next('/login');
            }
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
