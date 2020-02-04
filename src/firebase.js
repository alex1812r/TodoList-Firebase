import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg1P-85DDpOa35gC0kR4OJ5hoguOswJMY",
  authDomain: "todolist-526de.firebaseapp.com",
  databaseURL: "https://todolist-526de.firebaseio.com",
  projectId: "todolist-526de",
  storageBucket: "todolist-526de.appspot.com",
  messagingSenderId: "807303008723",
  appId: "1:807303008723:web:af9e68ea9fe8f88e169f26"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;