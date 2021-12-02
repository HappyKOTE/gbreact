import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBsY4X-E6jufaaPDQUOEJu12qSl9XvxdXo",
  authDomain: "gb-react-44ec6.firebaseapp.com",
  projectId: "gb-react-44ec6",
  storageBucket: "gb-react-44ec6.appspot.com",
  messagingSenderId: "696499343614",
  appId: "1:696499343614:web:73be9463d844de861855af",
  measurementId: "G-GN8DKV8V21"
}

const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)

export const auth = getAuth(app)

export const signUp = async (email, pass) =>
  await createUserWithEmailAndPassword(auth, email, pass)

export const logIn = async (email, pass) =>
  await signInWithEmailAndPassword(auth, email, pass)

export const logOut = async () => await signOut(auth)