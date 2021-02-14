import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            uid: '',
            email: '',
            name: '',
        },
    },
    mutations: {
        getUserInfo(state, authData) {
            state.user = authData;
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
    },
});
