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
                .then((response) => {
                    response.user.updateProfile({
                        displayName: userInfo.userName,
                    });
                    dispatch('updateUserInfo', userInfo.userName);
                })

                .catch((error) => {
                    alert(error.message);
                });
        },
        updateUserInfo({ commit }, name) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    commit('getUserInfo', {
                        uid: user.uid,
                        email: user.email,
                        name: name,
                    });
                }
            });
        },
    },
});
