import firebase from "firebase";

// Initialize Firebase

const firebaseConfig = {
	apiKey: "AIzaSyCODAIOCd62-7k4cg2stwltuexYzY-myC0",
	authDomain: "imagenes-firebase-2f967.firebaseapp.com",
	projectId: "imagenes-firebase-2f967",
	storageBucket: "imagenes-firebase-2f967.appspot.com",
	messagingSenderId: "294396471518",
	appId: "1:294396471518:web:b415a3107ff17c574cfa4f",
	measurementId: "G-7WL5XGTV4C"
};
  
const app  = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db   = firebase.storage()

export { auth, db, firebase }