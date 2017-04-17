// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import './directives'
import './filters'
import App from './App'
import router from './router'
import db from './database.js'
import firebase from 'firebase'

import { sync } from 'vuex-router-sync'
sync(store, router) // done.
// store.state.route.path   // current path (string)
// store.state.route.params // current params (object)
// store.state.route.query  // current query (object)

db.app

Vue.config.productionTip = false
import 'jquery-ui/jquery-ui.min.js'

// import imagesLoaded from 'imagesloaded'
// imagesLoaded.makeJQueryPlugin($)

import 'semantic-ui-css/semantic.js'
import 'semantic-ui-css/semantic.css'

console.log('NEWT!')

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    console.log('User is signed out!')
    router.replace('signin')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    this.$store.dispatch('setNotesRef', db.ref('notes'))
    this.$store.dispatch('setNotesOrderRef', db.ref('notesOrder'))
  }
})
