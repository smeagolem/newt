<template>
  <div class="ui center aligned text container sign-in-container">
    <h1 class="ui center aligned grey icon header">
      <i class="sticky note yellow icon"></i>
      NEWT
      <div class="sub header">dem notes yo</div>
    </h1>
    <form class="ui form" @submit.prevent="toggleSignIn" :class="{ loading: isLoading }">
      <div class="field">
        <div class="ui left icon input">
          <input type="email" name="email" placeholder="Email" v-model="login.email">
          <i class="user icon"></i>
        </div>
      </div>
      <div class="field">
        <div class="ui left icon input">
          <input type="password" name="password" placeholder="Password" v-model="login.password">
          <i class="lock icon"></i>
        </div>
      </div>
      <div class="field">
        <button class="ui grey large animated fade button" type="submit">
          <div class="visible content">Sign in</div>
          <div class="hidden content">
            <i class="sign in icon"></i>
          </div>
        </button>
      </div>
      <p><small>Sign in with...</small></p>
      <div class="ui stackable centered four column grid">
        <div class="column">
          <button type="button" class="ui google plus large fluid button disabled">
            <i class="google icon"></i>
            Google
          </button>
        </div>
        <div class="column">
          <button type="button" class="ui facebook large fluid button disabled">
            <i class="facebook icon"></i>
            Facebook
          </button>
        </div>
        <div class="column">
          <button type="button" class="ui twitter large fluid button disabled">
            <i class="twitter icon"></i>
            Twitter
          </button>
        </div>
        <div class="column">
          <button type="button" class="ui black large fluid button disabled">
            <i class="github icon"></i>
            Github
          </button>
        </div>
        <div class="sixteen wide center aligned column">
          <button type="button" class="ui large basic button">
            <i class="mail icon"></i>
            Sign up with email and password
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import router from '../router'
import { firebaseApp } from '../firebaseApp'
import { mapActions } from 'vuex'

export default {
  name: 'signin',
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      signup: {
        email: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    toggleSignIn () {
      const self = this
      if (firebaseApp.auth().currentUser) {
        firebaseApp.auth().signOut()
      } else {
        var email = self.login.email
        var password = self.login.password
        if (email.length < 4) {
          alert('Please enter an email address.')
          return
        }
        if (password.length < 4) {
          alert('Please enter a password.')
          return
        }
        this.signInWithEmailAndPassword({
          email,
          password
        }).catch(error => {
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.')
          } else {
            alert(errorMessage)
          }
          console.log(error)
          self.isLoading = false
        })
        self.isLoading = true
      }
    },
    handleSignUp () {
      var email = this.signup.email
      var password = this.signup.password
      if (email.length < 4) {
        alert('Please enter an email address.')
        return
      }
      if (password.length < 4) {
        alert('Please enter a password.')
        return
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // [START_EXCLUDE]
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.')
        } else {
          alert(errorMessage)
        }
        console.log(error)
        // [END_EXCLUDE]
      })
      // [END createwithemail]
    },
    ...mapActions([
      'signInWithEmailAndPassword'
    ])
  }
}

firebaseApp.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // var displayName = user.displayName
    // var email = user.email
    // var emailVerified = user.emailVerified
    // var photoURL = user.photoURL
    // var isAnonymous = user.isAnonymous
    // var uid = user.uid
    // var providerData = user.providerData
    // ...
    console.log('LOGGED IN!')
    router.push({name: 'home'})
  }
})
</script>

<style scoped>
.ui.form .field {
  max-width: 20em;
  margin: auto auto 1em;
}

.sign-in-container {
  padding-top: 3em;
}

.ui.loading.form:before {
  background: rgba(249, 249, 249, 0.8);
}
</style>
