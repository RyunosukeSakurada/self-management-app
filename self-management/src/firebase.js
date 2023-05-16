import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBSNTyRn6kqu-Wx2f1FgVWkJeF-fA-PfWQ",
  authDomain: "self-management-274ff.firebaseapp.com",
  projectId: "self-management-274ff",
  storageBucket: "self-management-274ff.appspot.com",
  messagingSenderId: "532267291427",
  appId: "1:532267291427:web:41d68ca49908f93339f296"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
export {db,auth};