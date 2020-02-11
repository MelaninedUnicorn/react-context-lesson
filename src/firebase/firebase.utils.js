import 'firebase/firestore';
import 'firebase/auth';

import firebase from 'firebase/app';

const config = {
  apiKey: "AIzaSyCE4mgM400zTKsDjLKFnJqXhakRR7B9HKs",
  authDomain: "crwn-ecommerce-adb73.firebaseapp.com",
  databaseURL: "https://crwn-ecommerce-adb73.firebaseio.com",
  projectId: "crwn-ecommerce-adb73",
  storageBucket: "crwn-ecommerce-adb73.appspot.com",
  messagingSenderId: "649778277455",
  appId: "1:649778277455:web:7c82e9ea6e17886ca00e3a",
  measurementId: "G-S26JWNTT7N"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
