import firebase  from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


const  firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}

// Base de datos
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos para grabar información
const db = firebase.firestore();
const storage  = firebase.storage();
// Provider para la autenticación de google.
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
    db,
    googleAuthProvider,
    firebase,
    storage
}