import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginEmailPassword, startGoogleLogin } from '../../redux/auth/actions';
import { connect } from 'react-redux';

const LoginScreen = (props) => {

    const [stateForm, setStateForm ] = useState({
        email: 'moisesrob@gmail.com',
        password: '123456'
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStateForm({ ...stateForm, [name]: value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.loginEmailPassword( stateForm )
    }

    const handleGoogleLogin = () => {
        props.startGoogleLogin()
    }

    const { email, password } = stateForm;
    return (
        <Fragment>
            <h5 className="auth__title">Login</h5>
            <form onSubmit={ handleFormSubmit }>
               <input
                    type="text"
                    name="email"
                    placeholder="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange= { (e) => handleInputChange(e) }
                /> 

               <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="auth__input"
                    value= { password }
                    onChange = { (e) => handleInputChange(e) }
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block"
                >Login</button>

                <div className="auth__login-social-network" onClick={ handleGoogleLogin }>
                <p>Login with social network</p>
                    <div className="google-btn" >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
            </form>
            <Link to="/auth/register">Register</Link>
        </Fragment>
    )
}


/** Configuración de redux para disparar la acción */
const mapDispatchToProps =  { loginEmailPassword, startGoogleLogin };
const connection = connect(null, mapDispatchToProps)(LoginScreen)
export default connection;