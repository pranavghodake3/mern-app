import React, {useState} from 'react';
import './login.css';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
    const [formDetails, setState] = useState({
        email: '',
        password: '',
        formStatusMessage: ''
    });

    function handleInputChange(e){
        setState(
            prev => ({ 
                ...prev,
                [e.target.name]: e.target.value
        }))
    }
    
    function handleLoginForm(e){
        e.preventDefault();
        console.log('formDetails: ',formDetails);
        axios.post('http://localhost:9002/auth/login', formDetails)
        .then((res) => {
            console.log('Login Success res.data: ', res.data);
            localStorage.setItem('authData', JSON.stringify(res.data.data));
            var headers = { headers: {"Authorization" : "Bearer "+res.data.data.accesstoken} };
            axios.get('http://localhost:9002/auth/profile', headers)
            .then((res) => {
                console.log('Profile call res.data: ',res.data);
                props.propToSetCurrentUser(res.data);
                props.history.push('/');
            })
            .catch((err) => {
                console.log('Error: ',err);
            })
        })
        .catch((err) => {
            console.log('Error: ',err);
            setState((prevState) => {
                return {...prevState, formStatusMessage: 'Invalid credentials'};
            });
        })
    }

    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleLoginForm} method="post">
                <div className="container">
                    <h3>{formDetails.formStatusMessage}</h3>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" onChange={handleInputChange}  value={formDetails.email} required />

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" value={formDetails.password} onChange={handleInputChange}  required />
                        
                    <button type="submit">Login</button>
                </div>

                <div className="container">
                    <Link to='/' className="cancelbtn">Cancel</Link>
                    <Link to='/registration' className='btn btn-primary'>Don't have an account ?</Link>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Login);
