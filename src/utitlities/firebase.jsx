

import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut  } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDatabase, onValue, ref, set } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCve44aqHT0K3CkmebkW9QTmgRdq1QrRRU",
  authDomain: "react-tutorial-dd8bd.firebaseapp.com",
  databaseURL: "https://react-tutorial-dd8bd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-tutorial-dd8bd",
  storageBucket: "react-tutorial-dd8bd.appspot.com",
  messagingSenderId: "974976044320",
  appId: "1:974976044320:web:61e77bdce0f6ca06abdb45",
  measurementId: "G-WR5ZGP4JSP"
};



const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const setData = (path, value) => (
  set(ref(database, path), value)
);

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));



export { firebaseSignOut as signOut };

export const useUserState = () => useAuthState(getAuth(firebase));

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { (`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { (val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

