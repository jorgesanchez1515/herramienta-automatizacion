import firebase from "firebase";

// Initialize Firebase

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    databaseURL: ""
} 
  
const app  = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db   = firebase.storage()

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export { auth, db, firebase }
