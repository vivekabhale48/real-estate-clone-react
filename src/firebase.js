// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRKC73HA_T-Q1n_0nfs4OcMBvmRUnckZk",
  authDomain: "realestate-clone-react-8998c.firebaseapp.com",
  projectId: "realestate-clone-react-8998c",
  storageBucket: "realestate-clone-react-8998c.appspot.com",
  messagingSenderId: "973558139268",
  appId: "1:973558139268:web:f4ba0a42f510213d6235d1"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();