import React from 'react';
import './registration.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends React.Component{
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
            confirm_password: '',
            profile_picture: null
        }
    }
    
    handleRegister = (e) => {
        e.preventDefault();
        if(this.validatedData()){
            var formData = new FormData();
            formData.append("profile_picture", this.state.profile_picture);
            formData.append("newname", 12345);
            console.warn(this.state.profile_picture);
            let postData = {...this.state};
            delete postData['confirm_password'];
            postData['profile_url'] = 'https://picsum.photos/300/300';
            postData['following'] = [];
            postData['followers'] = [];
            
            Object.keys(postData).forEach((k) => {
                formData.append(k, postData[k]);
            });
            console.log('this.state: ',this.state);
            console.log('this.state.profile_picture: ',this.state.profile_picture);
            console.log('formData: ',formData);

            const config = {     
                headers: { 'content-type': 'multipart/form-data' }
            }

            axios.post('http://localhost:9002/users', formData)
            .then((res) => {
                console.log("Success")
                /*Object.keys(this.state).forEach((k) => {
                    this.setState({
                        [k]: ''
                    });
                });*/
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
        var stateElementValue = e.target.value;
        if(e.target.name == 'profile_picture'){
            stateElementValue = e.target.files[0];
            console.log('handleFieldChange e.target.name: '+e.target.name)
        }
        this.setState({
            [e.target.name]: stateElementValue
        });
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleRegister} className='register' encType="multipart/form-data">
                    <div className="container">
                        <h1>Register</h1>
                        <h2>{this.state.formStatusMessage}</h2>
                        <hr />

                        <label for="profile_picture"><b>Profile Picture</b></label>
                        <input type="file" name="profile_picture" id="profile_picture" onChange={this.handleFiedChange} required />                        

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