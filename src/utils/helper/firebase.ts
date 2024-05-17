import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDxL_bvBwjv9ZBJSBauTGphfgrUNoejonQ",
  authDomain: "pabrikdevelopment.firebaseapp.com",
  projectId: "pabrikdevelopment",
  storageBucket: "pabrikdevelopment.appspot.com",
  messagingSenderId: "628070690068",
  appId: "1:628070690068:web:d8a28189d3b39612da2601",
  measurementId: "G-7LZ2MQYGDP",
};

export default firebase.initializeApp(firebaseConfig);
