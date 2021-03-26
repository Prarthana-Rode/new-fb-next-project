import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const  config = {
    apiKey: "AIzaSyAL2ESZEqCp98mJNZiWQ2KKnnNVK_U3NVA",
    authDomain: "fb-next-project.firebaseapp.com",
    projectId: "fb-next-project",
    storageBucket: "fb-next-project.appspot.com",
    messagingSenderId: "655391399902",
    appId: "1:655391399902:web:f8b87b84246bf54a3d874f",
    measurementId: "G-65FMK0XKPH"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }else {
    firebase.app(); 
 }
  
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { auth ,storage};
 
 