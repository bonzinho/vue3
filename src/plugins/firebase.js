// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: '',
  authDomain: 'music-6fcb5.firebaseapp.com',
  projectId: 'music-6fcb5',
  storageBucket: 'music-6fcb5.appspot.com',
  messagingSenderId: '318057982879',
  appId: '1:318057982879:web:59bb31202dfe22d8072baa'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection('users')

export { auth, db, usersCollection }
