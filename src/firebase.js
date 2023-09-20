import firebase from "firebase";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "kisan-portel.firebaseapp.com",
  databaseURL: "https://kisan-portel-default-rtdb.firebaseio.com",
  projectId: "kisan-portel",
  storageBucket: "kisan-portel.appspot.com",
  messagingSenderId: "341070149471",
  appId: "1:341070149471:web:3806926b7033217a81e8ea"
};
  
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export default database;