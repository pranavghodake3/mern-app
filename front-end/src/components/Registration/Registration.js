import React from 'react';
import './registration.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    }
    
    handleRegister = (e) => {
        e.preventDefault();
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
            let stateObj = this.state;
            console.log('stateObj: ',stateObj);
            console.log('this.state: ',this.state);
            Object.keys(stateObj).forEach(function(k){
                //console.log(k + ' - ' + stateObj[k]);
                stateObj[k] = '';
            });
            console.log('stateObj: ', stateObj)
            this.setState(stateObj);
        })
        .catch((err) => {
            console.log('Error: ',err);
        })
    }

    handleFiedChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    
    
    render(){
        return (
            <div>
                <form onSubmit={this.handleRegister}>
                    <div className="container">
                        <h1>Register</h1>
                        <p>Please fill in this form to create an account.</p>
                        <hr />

                        <label for="name"><b>Name</b></label>
                        <input type="text" placeholder="Enter Name" name="name" id="name" onChange={this.handleFiedChange} value={this.state.name} required />

                        <label for="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" id="email" onChange={this.handleFiedChange} value={this.state.email} required />

                        <label for="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" id="password" onChange={this.handleFiedChange} value={this.state.password} required />

                        <label for="confirm_password"><b>Confirm Password</b></label>
                        <input type="password" placeholder="Repeat Password" name="confirm_password" id="confirm_password" onChange={this.handleFiedChange} value={this.state.confirm_password} required />
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