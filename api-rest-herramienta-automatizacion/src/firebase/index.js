const firebase = require('firebase')
require('firebase/storage')

const firebaseConfig = {
    apiKey: "AIzaSyCODAIOCd62-7k4cg2stwltuexYzY-myC0",
    authDomain: "imagenes-firebase-2f967.firebaseapp.com",
    projectId: "imagenes-firebase-2f967",
    storageBucket: "imagenes-firebase-2f967.appspot.com",
    messagingSenderId: "294396471518",
    appId: "1:294396471518:web:b415a3107ff17c574cfa4f",
    measurementId: "G-7WL5XGTV4C",
    databaseURL: "gs://imagenes-firebase-2f967.appspot.com"
} 

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()
const db      = firebase.firestore()

module.exports = { storage, db }