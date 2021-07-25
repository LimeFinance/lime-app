import firebase from "firebase/app";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhaXO2mBbYWAzh9UUUeYLy5dZ38FrXD48",
  authDomain: "limefinance-ee38a.firebaseapp.com",
  projectId: "limefinance-ee38a",
  storageBucket: "limefinance-ee38a.appspot.com",
  messagingSenderId: "857571082014",
  appId: "1:857571082014:web:ca53cfd8db279d7386930f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
