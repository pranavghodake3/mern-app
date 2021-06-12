import React, {useState} from 'react';
import './registration.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Registration = (props) => {
    const [formValues, setState] = useState({
                formStatusMessage: '',
                nameError: '',
                emailError: '',
                passwordError: '',
                confirmPasswordError: '',
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            });

    const validatedData = () => {
        Object.keys(formValues).forEach((k) => {
            console.log(k + ' - ' + formValues[k]);
        });
        return true;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(validatedData()){
            let postData = formValues;
            delete postData['confirm_password'];
            postData['profile_url'] = 'http://localhost:9002/images/user2.png';
            postData['following'] = [];
            postData['followers'] = [];
            console.log('postData: ',postData);
            console.log('formValues: ',formValues);
            axios.post('http://localhost:9002/users', postData)
            .then((res) => {
                console.log("Success")
                // Object.keys(formValues).forEach((k) => {
                //     console.log(k + ' - ' + formValues[k]);
                //     setState((prev) => {
                //         return {...prev, [k]: ''};
                //     });
                // });
                setState((prev) => {
                    return {...prev, formStatusMessage: 'Registered successfully. Please login now.'};
                });
                props.history.push('/login');
            })
            .catch((err) => {
                console.log('Error: ',err);
            })
        }
    }

    const handleFieldChange = (e) => {
        setState((prev) => {
            return ({...prev, [e.target.name]: e.target.value});
        });
    }
    
    return (
        <div>
            <form onSubmit={handleRegister} className='register'>
                <div className="container">
                    <h1>Register</h1>
                    <h2>{formValues.formStatusMessage}</h2>
                    <hr />

                    <label htmlFor="name"><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" id="name" onChange={handleFieldChange} value={formValues.name} required />
                    {/* <div className='alert'>{nameError}</div> */}

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" onChange={handleFieldChange} value={formValues.email} required />
                    {/* <div className='alert'>{emailError}</div> */}

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" onChange={handleFieldChange} value={formValues.password} required />
                    {/* <div className='alert'>{passwordError}</div> */}

                    <label htmlFor="confirm_password"><b>Confirm Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="confirm_password" id="confirm_password" onChange={handleFieldChange} value={formValues.confirm_password} required />
                    {/* <div className='alert'>{confirmPasswordError}</div> */}
                    <hr />

                    <button type="submit" className="registerbtn">Register</button>
                </div>
                
                <div className="container signin">
                    <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
                </div>
                </form>
        </div>
    )
}

export default Registration;