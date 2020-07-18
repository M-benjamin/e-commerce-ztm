import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCOxSJkZRGl4yfEKuxiqCX2uJjjgttJ5GY",
  authDomain: "crown-db-a1e16.firebaseapp.com",
  databaseURL: "https://crown-db-a1e16.firebaseio.com",
  projectId: "crown-db-a1e16",
  storageBucket: "crown-db-a1e16.appspot.com",
  messagingSenderId: "729716787153",
  appId: "1:729716787153:web:302372ce778a36f79d02f0",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  console.log(userAuth);

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error created user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
