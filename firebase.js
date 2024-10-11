// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-aPNm2ITLE9EnQeOOxQRMpnTu15q6MPM",
  authDomain: "flashlinkio.firebaseapp.com",
  projectId: "flashlinkio",
  storageBucket: "flashlinkio.appspot.com",
  messagingSenderId: "160613280494",
  appId: "1:160613280494:web:2ce536664cc348df3521ff",
  measurementId: "G-EGM779PF7H",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
