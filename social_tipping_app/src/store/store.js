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
        otherUserData: null,
        clickUserStatus: {
            name: null,
            money: null,
        },
        isWalletModalShow: false,
    },
    getters: {
        uid: (state) => state.user.uid,
        displayName: (state) => state.user.name,
        moneyStatus: (state) => state.money,
        otherUserData: (state) => state.otherUserData,
        clickUserName: (state) => state.clickUserStatus.name,
        clickUserMoney: (state) => state.clickUserStatus.money,
        isWalletModalShow: (state) => state.isWalletModalShow,
    },
    mutations: {
        setUserInfo(state, authData) {
            state.user = authData;
        },
        setMoneyStatus(state, storeData) {
            state.money = storeData;
        },
        setOtherUserData(state, userData) {
            state.otherUserData = userData;
        },
        setClickUserStatus(state, userData) {
            state.clickUserStatus = userData;
        },
        setIsWalletModalShow(state, boolean) {
            state.isWalletModalShow = boolean;
        },
    },
    actions: {
        async signUp({ commit }, userInfo) {
            const authMyData = await firebase
                .auth()
                .createUserWithEmailAndPassword(
                    userInfo.email,
                    userInfo.password
                );

            await authMyData.user.updateProfile({
                displayName: userInfo.userName,
            });

            await commit('setUserInfo', {
                uid: authMyData.user.uid,
                email: authMyData.user.email,
                name: authMyData.user.displayName,
            });

            const db = firebase.firestore();
            const ref = db.collection('users').doc(authMyData.user.uid);
            ref.set({
                id: authMyData.user.uid,
                displayName: authMyData.user.displayName,
                money: 1000,
            })
                .then(() => {
                    router.push('/dashboard');
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
                })
                .catch((error) => {
                    alert(error.message);
                });
        },
        async updateUserInfo({ commit }) {
            await firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    commit('setUserInfo', {
                        uid: user.uid,
                        email: user.email,
                        name: user.displayName,
                    });
                }
            });
            router.push('/dashboard');
        },
        fetchMoneyStatus({ commit }) {
            const db = firebase.firestore();
            const { currentUser } = firebase.auth();
            if (currentUser) {
                const ref = db.collection('users').doc(currentUser.uid);
                ref.onSnapshot((doc) => {
                    let data = doc.data();
                    commit('setMoneyStatus', data.money);
                });
            }
        },
        logout({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUserInfo', null);
                    commit('setMoneyStatus', null);
                    router.push('/login');
                })
                .catch((error) => {
                    alert(error.message);
                });
        },
        async fetchOtherUserData({ commit, getters }) {
            const db = await firebase.firestore();
            db.collection('users')
                .where('displayName', '!=', getters.displayName)
                .onSnapshot((querySnapshot) => {
                    let otherUserData = [];
                    querySnapshot.forEach((doc) => {
                        otherUserData.push({
                            displayName: doc.data().displayName,
                            money: doc.data().money,
                        });
                        commit('setOtherUserData', otherUserData);
                    });
                });
        },
        clickUserStatus({ commit }, userData) {
            commit('setClickUserStatus', userData);
            commit('setIsWalletModalShow', true);
        },
    },
});
