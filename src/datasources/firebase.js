import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'

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

// 이메일 회원가입
const createUser = async (emailInput, password) => {
  return await createUserWithEmailAndPassword(auth, emailInput, password);
};

// 구글 로그인
const provider = new GoogleAuthProvider()
const googleLoginPopup = () => signInWithPopup(auth, provider)
// 이메일 로그인
const emailLogin = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
// 로그인 저장
const saveLoginInfo = () => {
  return setPersistence(auth, browserSessionPersistence)
} 
// 로그인 유지
const loginSession = () => {
  const data = sessionStorage.getItem(
    `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`,
  )
  return JSON.parse(data)
}

// cloud Firestore 초기화
const db = getFirestore()
// store 받아오기
const getFirebaseData = async (name) => {
  return await getDocs(collection(db, name))
}
// store 새로 만들기
const addFirebaseData = async (name, content) => {
  return await addDoc(collection(db, name), content)
}
// store 수정
const setFirebaseData = async (name, id, content) => {
  return await setDoc(doc(db, name, id), content)
}

// cloud stroage 초기화
const storage = getStorage(app)
// storage 업로드
const uploadFirestorage = (path, name, img) => {
  return new Promise((resolve) => {
    const storageRef = ref(storage, path + '/' + name)
    uploadBytesResumable(storageRef, img).then((r) => {
      getDownloadURL(r.ref).then((downloadURL) => {
        resolve(downloadURL)
      })
    })
  })
}

export {
  app,
  db,
  uploadFirestorage,
  getFirebaseData,
  addFirebaseData,
  setFirebaseData,
  googleLoginPopup,
  emailLogin,
  loginSession,
  saveLoginInfo,
  createUser,
  auth,
}
