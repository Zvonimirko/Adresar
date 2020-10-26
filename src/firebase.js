import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCCYgucz72YLvNx9DhO26yAARw-6TU5a-E",
  authDomain: "adresar-4f246.firebaseapp.com",
  databaseURL: "https://adresar-4f246.firebaseio.com",
  projectId: "adresar-4f246",
  storageBucket: "adresar-4f246.appspot.com",
  messagingSenderId: "618838561853",
  appId: "1:618838561853:web:eaba2bb1d6bff521e24654",
  measurementId: "G-WHKJXJK0PR",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
