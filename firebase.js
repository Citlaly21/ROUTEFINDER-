import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRplYQcLl5p6G1fW4IBAwbWgYKMnri9eM",
  authDomain: "route-finder-75a0b.firebaseapp.com",
  databaseURL: "https://route-finder-75a0b-default-rtdb.firebaseio.com",
  projectId: "route-finder-75a0b",
  storageBucket: "route-finder-75a0b.appspot.com",
  messagingSenderId: "833216771763",
  appId: "1:833216771763:web:cbaec2a9392817195222c6",
  measurementId: "G-HMMHJH8PPC"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;