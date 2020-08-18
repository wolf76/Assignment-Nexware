import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import { store } from './store'
import * as firebase from 'firebase'
import AlertComp from './components/Shared/Alert.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.component('tagicon', Icon)
Vue.component('app-alert', AlertComp)

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

store.commit('setUser', localStorage.getItem('token'))

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBUfUr8c0sgCk4RMxovNk5Rfbc5umU193U',
      authDomain: 'nexware-test.firebaseapp.com',
      databaseURL: 'https://nexware-test.firebaseio.com',
      projectId: 'nexware-test',
      storageBucket: 'nexware-test.appspot.com',
    })
    this.$store.dispatch('loadCustomers')
  }
}).$mount('#app')
