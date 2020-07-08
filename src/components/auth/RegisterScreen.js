import React, { Fragment, useState } from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setError, getError } from '../../redux/ui/actions';
import { registerWithEmailPasswordName } from '../../redux/auth/actions';

const credentials = {
    name : "Moises RB.",
    email : "moisesrob@gmail.com",
    password: "1234567",
    password2: "1234567"
}


const RegisterScreen = () =>{
    /* Dispatch and store reducers hooks */
    const dispatch = useDispatch();
    const ui = useSelector( store => store.ui);
    const [stateForm, setStateForm] = useState(credentials);
    const { name, email, password, password2 } = stateForm;
    

    const handleInputForm = (e) => {
        setStateForm( {...stateForm, [e.target.name]: e.target.value } );
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch(registerWithEmailPasswordName(stateForm));
        }
        
    }

    const isFormValid = () => {
        if(name.trim().length === 0){
            dispatch(getError("name is required"))
            return false;
        }else if(!validator.isEmail( email )){
            dispatch(getError("email is required"))
            return false;
        }else if( password !== password2 || password.length < 5){
            dispatch(getError("Password should be at least 6 characters and match each other"))
            return false;
        }
        dispatch( setError() );
        return true;
    }
    return (
        <Fragment>
            <h5 className="auth__title">Register</h5>
            <form onSubmit={ handleFormSubmit }>
                {
                    ui.loading &&
                        <div className="auth__alert-error"> {ui.msg} </div>
                }
               <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange= { (e) => handleInputForm(e) }
                    
                /> 
               <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange= { (e) => handleInputForm(e) }
                    
                /> 

               <input
                    type="password"
                    name="password"
                    placeholder="Paswword"
                    className="auth__input"
                    value={ password }
                    onChange= { (e) => handleInputForm(e) }
                    
                />

               <input
                    type="password"
                    name="password2"
                    placeholder="Confirm"
                    className="auth__input"
                    value={ password2 }
                    onChange= { (e) => handleInputForm(e) }
                    
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5 mt-5"
                >Login</button>
            </form>
        </Fragment>
    )
}

export default RegisterScreen