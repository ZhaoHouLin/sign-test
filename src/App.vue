<script>
import {fb,db} from './db'
import { onMounted, reactive, ref } from 'vue'
import { apiSignUpPage, apiSignInPage } from '../src/api'
export default {
  setup() {
    let card = ref()
    let cover = ref()
    let open = ref(true)
    let email = ref('')
    let pwd = ref('')
    let errorMsg = ref('')

    const user = reactive(
      {
        email: '',
        pwd: ''
      }
    )

    const handleSignUp = (e)=> {
      e.preventDefault()
      user.email = email.value
      user.pwd = pwd.value
      fb.auth().createUserWithEmailAndPassword(user.email, user.pwd)
        .then(u => {
          db.collection('profiles').doc(u.user.uid).set({
            name: user.email,
            password: user.pwd
          }).then(()=> {
            console.log('User created successfully')
            email.value = ''
            pwd.value = ''
          }).catch(err => {
            
          })
        }).catch(err => {
          errorMsg.value = err.message
        });
        email.value = ''
        pwd.value = ''
    }
    const handleSignIn = (e)=> {
      // console.log(e);
      user.email = email.value
      user.pwd = pwd.value
      e.preventDefault()
      fb.auth().signInWithEmailAndPassword(user.email, user.pwd)
        .then(()=> {
          let userData = fb.auth().currentUser
          if(userData) console.log(user)
          email.value = ''
          pwd.value = ''
        }).catch(err => {
          console.log(err.message);
        })
    }

    const facebookSignIn = ()=> {
      let provider = new fb.auth.FacebookAuthProvider()
      fb.auth().languageCode = 'it';
      // To apply the default browser preference instead of explicitly setting it.
      // firebase.auth().useDeviceLanguage();
      fb
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          let credential = result.credential;
          let user = result.user;
          let accessToken = credential.accessToken;
        })
        .catch((error) => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;
        });
    }

    const googleSignIn = ()=> {
      let provider = new fb.auth.GoogleAuthProvider()
      fb.auth().languageCode = 'it';
      // To apply the default browser preference instead of explicitly setting it.
      // firebase.auth().useDeviceLanguage();
      fb
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          let credential = result.credential;
          let user = result.user;
          let accessToken = credential.accessToken;
        })
        .catch((error) => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;
        });
    }

    const handleOpen = (e)=> {
      email.value = ''
      pwd.value = ''
      if(open.value) {
        // console.log('cover',cover);
        apiSignUpPage(cover.value)
        open.value = !open.value
      } else {
        apiSignInPage(cover.value)
        open.value = !open.value
      }
    }

    onMounted(()=> {
      let ref = db.collection('fruit').doc('apple');
      ref.set({
        total: 500,
        good: 480,
        sale: 330
      }).then(() => {
        console.log('set data successful');
      })
    })
    
    return {
      email,
      pwd,
      user,
      handleSignUp,
      handleSignIn,
      errorMsg,
      handleOpen,
      cover,
      card,
      facebookSignIn,
      googleSignIn
    }
  }
}
</script>

<template lang='pug'>
.card
  .wordLeft
    h2 Welcome Back
    p To keep connect with up please login with your personal info
    label(for="changePage") Sign In
  .wordRight
    h2 Hello Friend!
    p Enter your personal details and start journey with us
    label(for="changePage") Sign Up
  form(action="/users/login" method="").loginPage  
    h1 Log In
    .group
      label(for="email").far.fa-envelope
      input(type="email" name="email" placeholder='Email' v-model='email')
    .group
      label(for="password").fas.fa-key
      input(type="password" name="password" placeholder='password' v-model='pwd')
    .group
      button#login(type='submit' @click='handleSignIn') login
      a.fab.fa-facebook(@click='facebookSignIn')
      a.fab.fa-google-plus-g(@click='googleSignIn')
        
  form(action="/users/register" method="").registerPage
    h1(v-if='!errorMsg') Create Account
    h1(v-if='errorMsg') {{errorMsg}}
    //- .group
    //-   label(for="name").fas.fa-signature
    //-   input(type="text" name="name" placeholder='name')
    .group
      label(for="email").far.fa-envelope
      input#email(type="email" name="email" placeholder='Email' v-model='email')
    .group
      label(for="password").fas.fa-key
      input#pwd(type="password" name="password" placeholder='password' v-model='pwd')
    //- .group
    //-   label(for="password2").fas.fa-key
    //-   input(type="password" name="password2" placeholder=' confirm password')
    button#login(type='submit' @click='handleSignUp') Register
  .cover(ref='cover')
    button#changePage(name="changePage" @click='handleOpen')

</template>

<style lang="stylus">
$color_brown= #9b4b4b

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px



*
  font-family '微軟正黑體'
  transition 0.5s
  box-sizing border-box
  user-select: none
  outline: none
  
size(w=100%,h=w,bdrs=16px) 
  width w
  height h
  border-radius bdrs
  
flexCenter(j=center,a=j)
  display flex
  justify-content j
  align-items a

html,body
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  
.card
  box-shadow 2px 2px 4px rgba(0,0,0,0.5)
  size(800px,480px,8px)
  overflow hidden
  position relative
  
  .wordLeft,.wordRight
    background-color transparent
    flexCenter()
    text-align center
    height 200px
    margin-top 100px
    z-index 4
    color #fff
    position absolute
    padding 16px
    label
      color $color_brown
      font-weight 900
      position absolute
      margin-top 239px
      
    
  .wordLeft
    width 300px
    flex-direction column
    margin-left -300px
    // p
    //   padding 16px

  .wordRight
    right 0
    width 300px
    flex-direction column
   
  .loginPage,.registerPage
    color $color_brown
    z-index 3
    flexCenter()
    flex-direction column
    text-align center
    position absolute
    size(500px,480px,0px)
    #login
      margin-top 4px
      size(100px,40px,16px)
      border none
      color #fff
      background-color $color_brown
      cursor pointer
      
    .fab.fa-facebook,.fab.fa-google-plus-g
      flexCenter()
      text-decoration none
      margin-top 8px
      font-size 24px
      size(100px,40px,16px)
      color #fff
      background-color $color_brown
      cursor pointer
    .group
      margin 8px
      label
        margin-right 4px
  .registerPage
    right 0
    opacity 0

  .cover
    z-index 3
    flexCenter()
    flex-direction column
    size(300px,480px,0px)
    position absolute
    right 0px
    background-color $color_brown
    color #fff
    #changePage
      position absolute
      size(100px,40px,16px)
      border none
      margin-top 160px
      color $color_brown
      background-color #fff
      font-size 20px

      
      
  


</style>
