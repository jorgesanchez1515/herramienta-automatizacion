const firebase = require('firebase')
require('firebase/storage')

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

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()
const db      = firebase.firestore()

module.exports = { storage, db }
