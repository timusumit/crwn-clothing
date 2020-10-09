import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyAnukgfJtuCuq9Hn4bFwjzKMkTR_oYPqS4",
    authDomain: "crwn-db-6f14c.firebaseapp.com",
    databaseURL: "https://crwn-db-6f14c.firebaseio.com",
    projectId: "crwn-db-6f14c",
    storageBucket: "crwn-db-6f14c.appspot.com",
    messagingSenderId: "581977887588",
    appId: "1:581977887588:web:61bcae675da31b35c6e071",
    measurementId: "G-8NLNRJWPPN"
  };


  export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const {displayName, email}= userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName, 
          email,
          createdAt,
          ...additionalData

        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }
  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const providers = new firebase.auth.GoogleAuthProvider();
  providers.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(providers);

  export default firebase;