import React, { useEffect, useState } from 'react';
import { 
    BrowserRouter as Router, 
    Switch, 
    Redirect,  
    } from 'react-router-dom';
import { firebase } from './../firebase/config';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/actions';

import { AuthRouter } from './AuthRouter';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';


import JournalScreen from '../components/journal/JournalScreen';
import { startLoadNotes } from '../redux/notes/actions';

export const AppRouter = () => {

    const [ checking, setChecking ] = useState(true);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            if(user?.uid){
                dispatch( login(user) );
                setIsAuthenticated(true); 
                dispatch( startLoadNotes( user.uid ) );
            }else{
                setIsAuthenticated(false);
            }
            setChecking(false);
        })
    }, [ dispatch, setChecking]);


    if( checking ){ return( <h2>Loading page...</h2>) }
    /** Manejamos una pantalla de carga  */
    
    return ( 
        <Router>
            <Switch>
                <PublicRouter  
                    path="/auth" 
                    isAuthenticated={ isAuthenticated }
                    component={ AuthRouter }
                />
                <PrivateRouter
                    exact 
                    path="/" 
                    isAuthenticated={ isAuthenticated }
                    component= { JournalScreen }
                />
                <Redirect to="/auth/login"/>
            </Switch>
        </Router>

    )
}