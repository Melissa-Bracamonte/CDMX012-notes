import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged,
     signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db} from "./firebase-config";
import React from 'react';
// import { getDoc, setDoc } from "firebase/firestore";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(false);

    useEffect(() => {
       const unsuscribe = onAuthStateChanged(auth, (user) => {
           console.log(user);
    //         // if(user){
    //         //     const { email, displayName, uid } = user;
    //         //     setUser({email, displayName, uid});
    //         // } else {
    //         //     setUser(null);
    //         // }
        });
      return () => unsuscribe();
    }, []);

    // onAuthStateChanged(auth, (userFirebase) => {
    //         console.log(user);
    //         if(user){
    //             setUser(userFirebase);
    //             // console.log(userFirebase);
    //         } else {
    //             setUser(false);
    //         }
    //     });

    // React.useEffect(()=>{
    //  const getData = async () => {
    //   try {
    //      // const db = app.firestore()
    //     const data = await db.collection('notes').get
    //      console.log(data.docs)
    //   } catch (error) {
    //       console.log(error);
    //    }
    // }
    //  getData();
    // }, [])





    

    // const fakeData = [];

// async function getDocument (idDocument){
//     const docuRef = doc(db, `notes${idDocument}`);

//     const consult = await getDoc(docuRef);
//     if(consult.exists()){
//         const infoDoc = consult.data();
//         return infoDoc.Titulo
//     }else{
//        await setDoc(docuRef, {notas: [...fakeData]});
//     }
// }

    // React.useEffect(()=>{
    // const getData = async () => {
    //     const userlogin = auth.currentUser;
    //   const uid = userlogin.uid;
    //   addDoc(collection(db, 'notes'), {
    //      descripción, titulo, timestamp: serverTimestamp(),
    //     });
    //     };
    //     getData();
    // }, [])

    // export const post = (text, displayName) => {
    //     const db = getFirestore();
    //     const auth = getAuth();
    //     const userlogin = auth.currentUser;
    //     const uid = userlogin.uid;
    //     addDoc(collection(db, 'Posts'), {
    //       displayName, text, uid, likes: [], timestamp: serverTimestamp(),
    //     });
    //   };

    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const logOut = () => signOut(auth);

    const loginGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider);
    };

    
    return (
        <UserContext.Provider value={{ user, setUser, createUser, loginUser, logOut, loginGoogle}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;