// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvQOeE-6KHTtTnNEzbfstKSzg5NA5DU8o",
  authDomain: "callet-64450.firebaseapp.com",
  projectId: "callet-64450",
  storageBucket: "callet-64450.appspot.com",
  messagingSenderId: "901145964093",
  appId: "1:901145964093:web:7160f8fff1325507d20454"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const storage = getStorage(app)

export { db, storage };