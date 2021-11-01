// Import the functions you need from the SDKs you need
// import {initializeApp} from 'firebase/app';
// import firebase from 'react-native-firebase';
// creating test branch

// import * as firebase from "firebase";
import * as firebase from "./node_modules/firebase/firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBawtSOjHF2loaPq4nXXu8FLU43qzCtJ2s",
  authDomain: "routeam-c901f.firebaseapp.com",
  projectId: "routeam-c901f",
  storageBucket: "routeam-c901f.appspot.com",
  messagingSenderId: "698713936035",
  appId: "1:698713936035:web:eab1414fbefd0c8628ef16",
  measurementId: "G-0Z0K3NXW4Z"
};

// Initialize Firebase
// initializeApp(firebase);
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}
const auth = firebase.auth();
const db = firebase.firestore(app);
export {auth, db};