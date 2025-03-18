import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"; 
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAMUhVCBPXSbY2k1Y14tmg1n1pdYyhL8ek",
  authDomain: "netflix-clone-e9b50.firebaseapp.com",
  projectId: "netflix-clone-e9b50",
  storageBucket: "netflix-clone-e9b50.firebasestorage.app",
  messagingSenderId: "489346065386",
  appId: "1:489346065386:web:a74e6abb24c59cb8f78893",
  measurementId: "G-R9WB4Z8W74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
       const res =  await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc (collection (db, "users"), {
           uid: user.uid,
           name,
           authProvider: "local",
           email,
       });
    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async(email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password)
    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = () => {
    signOut (auth);
}

export { auth, db, signup, login, logout };