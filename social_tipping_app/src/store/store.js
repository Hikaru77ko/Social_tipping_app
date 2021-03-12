import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '../router/router.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            uid: null,
            email: null,
            name: null,
        },
        money: null,
    },
    getters: {
        uid: (state) => state.user.uid,
        displayName: (state) => state.user.name,
        moneyStatus: (state) => state.money,
    },
    mutations: {
        getUserInfo(state, authData) {
            state.user = authData;
        },
        updateMoneyStatus(state, storeData) {
            state.money = storeData;
        },
    },
    actions: {
        signUp({ dispatch }, userInfo) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    userInfo.email,
                    userInfo.password
                )
                .then((user) => {
                    user.user.updateProfile({
                        displayName: userInfo.userName,
                    });
                })
                .then(() => {
                    dispatch('signIn', userInfo);
                })
                .catch((error) => {
                    alert(error.message);
                });
        },
        signIn({ dispatch }, userInfo) {
            firebase
                .auth()
                .signInWithEmailAndPassword(userInfo.email, userInfo.password)
                .then(() => {
                    dispatch('updateUserInfo');
                    router.push('/dashboard');
                })
                .catch((error) => {
                    alert(error.message);
                });
        },
        updateUserInfo({ commit }) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    commit('getUserInfo', {
                        uid: user.uid,
                        email: user.email,
                        name: user.displayName,
                    });
                }
            });
        },
        getMoneyStatus({ commit }) {
            const db = firebase.firestore();
            const { currentUser } = firebase.auth();
            if (currentUser) {
                const ref = db.collection(`users/${currentUser.uid}/userInfo`);
                ref.onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        commit('updateMoneyStatus', data.money);
                    });
                });
            }
        },
        logout({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('getUserInfo', null);
                    commit('updateMoneyStatu', null);
                    router.push('/login');
                })
                .catch((error) => {
                    alert(error.message);
                });
        },
    },
});
