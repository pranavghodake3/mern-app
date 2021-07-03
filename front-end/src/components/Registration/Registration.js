import React, {useState} from 'react';
import './registration.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Registration = (props) => {
    const history = useHistory();
    const [state, setState] = useState({
        formStatusMessage: '',
        nameError: '',
        emailError: '',
        passwordError: '',
        confirm_passwordError: '',
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        validForm: false
    });

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('handleFieldChange state: ', state);
        if(state.validForm){
            setState((prev) => {
                return {...prev, formStatusMessage: ''};
            });
            let postData = state;
            delete postData['confirm_password'];
            postData['profile_url'] = 'http://localhost:9002/images/user2.png';
            postData['following'] = [];
            postData['followers'] = [];
            console.log('postData: ',postData);
            console.log('state: ',state);
            axios.post('http://localhost:9002/users', postData)
            .then((res) => {
                console.log("Success")
                // Object.keys(state).forEach((k) => {
                //     console.log(k + ' - ' + state[k]);
                //     setState((prev) => {
                //         return {...prev, [k]: ''};
                //     });
                // });
                setState((prev) => {
                    return {...prev, formStatusMessage: 'Registered successfully. Please login now.'};
                });
                history.replace('/login');
            })
            .catch((err) => {
                console.log('Error: ',err);
            })
        }else{
            setState((prev) => {
                return {...prev, formStatusMessage: 'Validation errors are there please check.'};
            });
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleFieldChange = (e) => {
        var errorMessage = '';
        var maxCharlimit = 20;
        var passwordMax = 8;
        var fieldName = e.target.name;
        
        fieldName = fieldName.replaceAll('_', ' ');
        fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        switch (e.target.name) {
            case 'name':
                if(e.target.value.length > maxCharlimit){
                    errorMessage = fieldName+' must have max '+maxCharlimit+' characters';
                }
                break;
            case 'email':
                if(e.target.value.length > maxCharlimit){
                    errorMessage = fieldName+' must have max '+maxCharlimit+' characters';
                }
                if(!validateEmail(e.target.value)){
                    errorMessage = fieldName+' is invalid';
                }
                break;
            case 'password':
                if(e.target.value.length > passwordMax){
                    errorMessage = fieldName+' must have max '+passwordMax+' characters';
                }
                break;
            case 'confirm_password':
                if(e.target.value != state.password){
                    errorMessage = fieldName+' is not same';
                }
                if(e.target.value.length > passwordMax){
                    errorMessage = fieldName+' must have max '+passwordMax+' characters';
                }
                break;
            default:
                break;
        }
        setState((prev) => {
            return ({...prev, [e.target.name]: e.target.value, [e.target.name+'Error']: errorMessage, validForm: errorMessage != '' ? false : true});
        });
        console.log('handleFieldChange state: ', state);
    }
    
    return (
        <div className='container register-screen'>
            <form onSubmit={handleRegister} className='register'>
                <div className="container">
                    <h1 className='heading-title'>Register</h1>
                    <h2>{state.formStatusMessage}</h2>

                    <label htmlFor="name"><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" id="name" onChange={handleFieldChange} value={state.name} required />
                    <div className='alert'>{state.nameError}</div>

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" onChange={handleFieldChange} value={state.email} required />
                    <div className='alert'>{state.emailError}</div>

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" onChange={handleFieldChange} value={state.password} required />
                    <div className='alert'>{state.passwordError}</div>

                    <label htmlFor="confirm_password"><b>Confirm Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="confirm_password" id="confirm_password" onChange={handleFieldChange} value={state.confirm_password} required />
                    <div className='alert'>{state.confirm_passwordError}</div>
                    <hr />

                    <button type="submit" className="registerbtn btn btn-primary" disabled={!state.validForm}>Register</button>
                </div>
                
                <div className="container signin">
                    <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
                </div>
                </form>
        </div>
    )
}

export default Registration;