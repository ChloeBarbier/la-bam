
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

// v9 compat packages are API compatible with v8 code
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBplTHpjkn_AtGjOvne43lZTsxtMljqIk",
  authDomain: "la-bam-79775.firebaseapp.com",
  projectId: "la-bam-79775",
  storageBucket: "la-bam-79775.appspot.com",
  messagingSenderId: "191111867983",
  appId: "1:191111867983:web:107cb2b654dcdafdec443a",
  measurementId: "G-RCQ8TMXJZ2",
  databaseURL: "https://la-bam-79775-default-rtdb.europe-west1.firebasedatabase.app/",
};
firebase.initializeApp(firebaseConfig);

export default firebase;