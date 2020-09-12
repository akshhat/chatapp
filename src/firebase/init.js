import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC4AVagbc2Muvpnhwtrd5Tjq5a1t5Vi_aE",
    authDomain: "chat-app-c4643.firebaseapp.com",
    databaseURL: "https://chat-app-c4643.firebaseio.com",
    projectId: "chat-app-c4643",
    storageBucket: "chat-app-c4643.appspot.com",
    messagingSenderId: "125293328428",
    appId: "1:125293328428:web:5bdeccd1120cecd894b989",
    measurementId: "G-BYREEVZKYC"
  };
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore()