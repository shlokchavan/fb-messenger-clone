import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCEiF7x1_v5kSzNhPT_AHdOfvKWgn1BX_I",
  authDomain: "facebook-messenger-clone-99a65.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-99a65.firebaseio.com",
  projectId: "facebook-messenger-clone-99a65",
  storageBucket: "facebook-messenger-clone-99a65.appspot.com",
  messagingSenderId: "845589945988",
  appId: "1:845589945988:web:180a4aa6ca23ca20de2cd1",
  measurementId: "G-ZWVPWHKE1W",
});

const db = firebaseApp.firestore();

export default db;
