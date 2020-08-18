import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    newCust: {
      fname: '',
      lname: '',
      email: '',
      mobile: '',
      website: '',
      address: ''
    },
    loadedCustomers: {
      totalCust: '',
      fname: '',
      lname: '',
      email: '',
      mobile: '',
      website: '',
      address: ''
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      localStorage.setItem('token', payload)
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    addCustomer(state, payload) {
      state.newCust.fname = payload.fname
      state.newCust.lname = payload.lname
      state.newCust.email = payload.email
      state.newCust.mobile = payload.mobile
      state.newCust.website = payload.website
      state.newCust.address = payload.address
    },
    setLoadedCustomers(state, payload) {
      state.loadedCustomers = payload
    },
    setTotalCust(state, payload) {
      state.loadedCustomers.totalCust = payload
    }
  },
  actions: {
    registerUser({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            console.log(user)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    loginUser({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const loadedCust = {
              id: user.user.uid,
              email: user.user.email
            }
            commit('setUser', loadedCust)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    clearError({commit}) {
      commit('clearError')
    },
    addCustomer({commit}, payload) {
      const customer = {
        fname: payload.fname,
        lname: payload.lname,
        email: payload.email,
        mobile: payload.mobile,
        website: payload.website,
        address: payload.address
      }
      firebase.database().ref('customers').push(customer)
        .then(
          (data) => {
            console.log(data)
            commit('addCustomer', payload)
          }
        )
        .catch((
          error) => {
            console.log(error)
          }
        )
    },
    updateCustomer({commit}, payload) {
      firebase.database().ref('customers/'+payload.id).set({
        fname: payload.fname,
        lname: payload.lname,
        email: payload.email,
        mobile: payload.mobile,
        website: payload.website,
        address: payload.address
      })
      commit('clearError')
    },
    deleteCustomer({commit}, payload) {
      firebase.database().ref('customers/'+payload).remove()
      commit('clearError')
    },
    loadCustomers({commit}) {
      commit('setLoading', true)
      firebase.database().ref('customers').on('value',(snap)=>{
        var totalRecord =  snap.numChildren();
        const customers =[]
        const obj = snap.val()
        for (let key in obj) {
          customers.push({
            id: key,
            fname: obj[key].fname,
            lname: obj[key].lname,
            email: obj[key].email,
            mobile: obj[key].mobile,
            website: obj[key].website,
            address: obj[key].address
          })
        }
        commit('setLoadedCustomers', customers)
        commit('setTotalCust', totalRecord)
        commit('setLoading', false)
      })
    },
    logout({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    },
    loading(state) {
      return state.loading
    },
    customersList(state) {
      return state.loadedCustomers
    }
  }
});
