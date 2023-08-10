import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsrVN1OqViv_W_K7LzW8GG5ZsNtWU1V7w",
    authDomain: "react-todolist-395316.firebaseapp.com",
    projectId: "react-todolist-395316",
    storageBucket: "react-todolist-395316.appspot.com",
    messagingSenderId: "729252674569",
    appId: "1:729252674569:web:f2830ffdb0738eb4e50cd8",
    measurementId: "G-KFBM081JSX"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
