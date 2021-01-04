import firebase from 'firebase'
import 'firebase/firestore'





const firebaseConfig = {
  apiKey: 'AIzaSyBWSzm51LixwtBTptp2_u7HtoTPmlqfKcQ',
  authDomain: 'sign-200d8.firebaseapp.com',
  databaseURL: 'https://console.firebase.google.com/project/sign-200d8/firestore/data~2Fexpense~2Fexpense01',
  projectId: 'sign-200d8',
  appId: '1:344952759460:web:8c874a453de9b8e5f7f231'
}

firebase
  .initializeApp(firebaseConfig)
  .firestore()
  .settings({ timestampsInSnapshots: true })


export const db = firebase.firestore()
export const fb = firebase

// export const db = firebase.initializeApp(firebaseConfig).firestore()

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// var firebaseConfig = {
//   apiKey: "AIzaSyBWSzm51LixwtBTptp2_u7HtoTPmlqfKcQ",
//   authDomain: "sign-200d8.firebaseapp.com",
//   projectId: "sign-200d8",
//   storageBucket: "sign-200d8.appspot.com",
//   messagingSenderId: "344952759460",
//   appId: "1:344952759460:web:8c874a453de9b8e5f7f231",
//   measurementId: "G-HTZN35BZSG"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();