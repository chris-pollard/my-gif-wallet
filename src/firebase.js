import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCY0_AN1kEb2DuD72_1LGULZvXzWQSeISE",
    authDomain: "gif-wallet-341ba.firebaseapp.com",
    projectId: "gif-wallet-341ba",
    storageBucket: "gif-wallet-341ba.appspot.com",
    messagingSenderId: "636352101787",
    appId: "1:636352101787:web:21167d802a8ad25162b53e"
});

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        clientID: 'therealchrispollard@gmail.com.apps.googleusercontent.com'
      }
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

export { firebaseConfig as firebase, uiConfig }