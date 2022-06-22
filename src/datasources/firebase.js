import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCYX6ARJoL4o85wYhRK9vtTzsXiOBhhk1w',
  authDomain: 'mycup-yourcup.firebaseapp.com',
  projectId: 'mycup-yourcup',
  storageBucket: 'mycup-yourcup.appspot.com',
  messagingSenderId: '276042250201',
  appId: '1:276042250201:web:b2f5b07a67e315699c8bc8',
  measurementId: 'G-F8RG45WD8Q',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// 인증 초기화
const auth = getAuth(app)

// 구글 로그인
const provider = new GoogleAuthProvider()
const googleLoginPopup = () => signInWithPopup(auth, provider)
// 이메일 로그인
const emailLogin = (email, password) => signInWithEmailAndPassword(auth, email, password)

// cloud Firestore 초기화
const db = getFirestore()
const getFirebaseData = async (name) => {
  return await getDocs(collection(db, name))
}

export { app, db, getFirebaseData, googleLoginPopup, emailLogin, auth }
