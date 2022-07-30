import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBVojq7qoo_Ie75BsqJMKNmnahMeYFNSFg",
    authDomain: "expressionsapp-8ce7c.firebaseapp.com",
    projectId: "expressionsapp-8ce7c",
    storageBucket: "expressionsapp-8ce7c.appspot.com",
    messagingSenderId: "915858285398",
    appId: "1:915858285398:web:b5cc3bdc436805d55aecf7"
  };

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}