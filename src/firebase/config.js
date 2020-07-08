import firebase  from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


const  firebaseConfig = {
    apiKey: "AIzaSyDJRlYs1TdXeKVeUKGEou31R3CHUgo2IeU",
    authDomain: "react-curso-d3622.firebaseapp.com",
    databaseURL: "https://react-curso-d3622.firebaseio.com",
    projectId: "react-curso-d3622",
    storageBucket: "react-curso-d3622.appspot.com",
    messagingSenderId: "1024813913886",
    appId: "1:1024813913886:web:593feee160ca2d19d21b0f"
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