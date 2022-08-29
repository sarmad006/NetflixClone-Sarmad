// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfkZNhMp_CKjkoxCYx7EPURnNayrSrtOc",
    authDomain: "netflixclone-56d56.firebaseapp.com",
    projectId: "netflixclone-56d56",
    storageBucket: "netflixclone-56d56.appspot.com",
    messagingSenderId: "187150550750",
    appId: "1:187150550750:web:0601fa900e08dc6249244f",
    measurementId: "G-RVYHSXJ0XZ"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }