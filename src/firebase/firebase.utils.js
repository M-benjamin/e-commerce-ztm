import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
    apiKey: "AIzaSyCOxSJkZRGl4yfEKuxiqCX2uJjjgttJ5GY",
    authDomain: "crown-db-a1e16.firebaseapp.com",
    databaseURL: "https://crown-db-a1e16.firebaseio.com",
    projectId: "crown-db-a1e16",
    storageBucket: "crown-db-a1e16.appspot.com",
    messagingSenderId: "729716787153",
    appId: "1:729716787153:web:302372ce778a36f79d02f0"
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
