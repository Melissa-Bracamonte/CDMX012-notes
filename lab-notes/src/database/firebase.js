import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase, set, ref} from 'firebase/database';
import { app } from './firebase-config';

// import React from 'react'

const createUserWithEmail = async (email, password, username) => {
 const auth = getAuth();
  const database = getDatabase(app);
  const isUserCreated = {
   status: false,
   errorCode: '',
  };
 try {
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   const user = userCredential.user;
   set(ref(database, `users/${user.uid}`), {
    username,
    email,
  });
 isUserCreated.status = true;
 } catch (error) {
   isUserCreated.status = false;
   isUserCreated.errorCode = error.code;
   alert('error');
  }
 return isUserCreated;
 };

 export { createUserWithEmail };

  const signUpWithGoogle = async () => {
    const auth = getAuth();
    let signUpGoogle;
    const provider = new GoogleAuthProvider();
    try {
      // const result = await signInWithPopup(auth, provider);
      await signInWithPopup(auth, provider);
      // GoogleAuthProvider.credentialFromResult(result);
      signUpGoogle = true;
    } catch (error) {
      // GoogleAuthProvider.credentialFromError(error);
      signUpGoogle = false;
    }
    return signUpGoogle;
  };
 
export { signUpWithGoogle };