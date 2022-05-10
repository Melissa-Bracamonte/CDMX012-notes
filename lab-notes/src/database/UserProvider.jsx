import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged,
     signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase-config";
import React from 'react';

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState('');
    // const [user, setUser] = useState(false);

    useEffect(() => {
       const unsuscribe = onAuthStateChanged(auth, (userUid) => {
           console.log(userUid);
           setUser(userUid)
        //    window.user = user
           //return user

        });
      return () => unsuscribe();
    }, []);

    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const logOut = () => signOut(auth);

    const loginGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
    };

    
    return (
        <UserContext.Provider value={{ user, setUser, createUser, loginUser, logOut, loginGoogle}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;