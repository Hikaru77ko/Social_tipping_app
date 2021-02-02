import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCG9JBiEisYcNWs3Ubgjf6KgFTmqDM56pI",
  authDomain: "vue-social-tipping-app.firebaseapp.com",
  projectId: "vue-social-tipping-app",
  storageBucket: "vue-social-tipping-app.appspot.com",
  messagingSenderId: "398895631366",
  appId: "1:398895631366:web:c12404158ba8544f434787"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
