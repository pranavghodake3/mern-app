import React from 'react';
import './registration.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ClassRegistration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formStatusMessage: '',
            nameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    }
    
    handleRegister = (e) => {
        e.preventDefault();
        if(this.validatedData()){
            let postData = {...this.state};
            delete postData['confirm_password'];
            postData['profile_url'] = 'http://localhost:9002/images/user2.png';
            postData['following'] = [];
            postData['followers'] = [];
            console.log('postData: ',postData);
            console.log('this.state: ',this.state);
            axios.post('http://localhost:9002/users', postData)
            .then((res) => {
                console.log("Success")
                Object.keys(this.state).forEach((k) => {
                    console.log(k + ' - ' + this.state[k]);
                    this.setState({
                        [k]: ''
                    });
                });
                this.setState({
                    formStatusMessage: 'Registered successfully. Please login now.'
                });
            })
            .catch((err) => {
                console.log('Error: ',err);
            })
        }
    }

    validatedData = () => {


        Object.keys(this.state).forEach((k) => {
            console.log(k + ' - ' + this.state[k]);
        });
        this.setState({
            formStatusMessage: 'Error in the form'
        });
        return true;
    }

    handleFiedChange = (e) => {
        var stateElementName = e.target.name;
        if(e.target.name == 'profile_picture'){
            stateElementName = e.target.files[0];
        }
        this.setState({
            [stateElementName]: e.target.value
        });
    }
    
    
    
    render(){
        return (
            <div>
                <form onSubmit={this.handleRegister} className='register'>
                    <div className="container">
                        <h1>Register</h1>
                        <h2>{this.state.formStatusMessage}</h2>
                        <hr />

                        <label for="name"><b>Name</b></label>
                        <input type="text" placeholder="Enter Name" name="name" id="name" onChange={this.handleFiedChange} value={this.state.name} required />
                        <div className='alert'>{this.state.nameError}</div>

                        <label for="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" id="email" onChange={this.handleFiedChange} value={this.state.email} required />
                        <div className='alert'>{this.state.emailError}</div>

                        <label for="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" id="password" onChange={this.handleFiedChange} value={this.state.password} required />
                        <div className='alert'>{this.state.passwordError}</div>

                        <label for="confirm_password"><b>Confirm Password</b></label>
                        <input type="password" placeholder="Repeat Password" name="confirm_password" id="confirm_password" onChange={this.handleFiedChange} value={this.state.confirm_password} required />
                        <div className='alert'>{this.state.confirmPasswordError}</div>
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
}

export default Registration;