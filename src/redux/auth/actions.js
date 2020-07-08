import { firebase, googleAuthProvider } from './../../firebase/config';
import Swal from 'sweetalert2';


import { LOGIN, LOGOUT } from "./types";
import { cleaningNotes } from '../notes/actions';


export const login = ({ uid, email, displayName }) => {
    return {
        type:LOGIN,
        payload:{
            uid,
            email,
            displayName
        }
    }
}

/* Login normal. */
export const loginEmailPassword = ({email, password}) => {
    return dispatch => { // Retornamos un callback, encargado de ejecutar la petición async.    
        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( ({user}) => {
            dispatch( login(user) );
        }).catch(error => {
            Swal.fire("Error", error.message, 'error')
        });
    }
} 

/** Login con google */
export const startGoogleLogin = () => {
    return dispatch => {
        firebase.auth().signInWithPopup( googleAuthProvider )
        .then( ({user}) => {
            dispatch( login(user) );
        }).catch(error => {
            Swal.fire("Error", error.message, 'error')
        })
    }
}

/*  Registrar usaurio en firebase. */
export const registerWithEmailPasswordName = userRegister => {
    const {email, password, name} = userRegister;
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async ({user}) => {
             await user.updateProfile({displayName: name });
             dispatch( login( user ) );
        }).catch( error => {
            Swal.fire("Error", error.message, 'error');
        });
    }

}


/*  Implementación del Logout  */

export const startLogout = () => {
    /* Al ser una función async, debo utilizar thunk para esperar la petición */
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch( cleaningNotes() );
        dispatch({ type:LOGOUT })
    }
}