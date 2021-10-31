import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "clone-8d8b1.firebaseapp.com",
  projectId: "clone-8d8b1",
  storageBucket: "clone-8d8b1.appspot.com",
  messagingSenderId: "443788181024",
  appId: process.env.REACT_APP_APP_ID
};
const firebseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebseApp)
const auth = getAuth(firebseApp)

export { db, auth };
