import React from 'react';
import './login.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';


class ClassLogin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            successMessage: '',
            email: '',
            password: ''
        }
        console.log('history props: ', this.props.history)
    }

    handleLoginForm = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9002/auth/login', this.state)
        .then((res) => {
            console.log('Success: ', res.data);
            localStorage.setItem('authData', JSON.stringify(res.data.data));
            this.setState({
                successMessage: 'Successfull logged in'
            });
        })
        .catch((err) => {
            console.log('Error: ',err);
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render(){
        return (
            <div className='container'>
                <h2>Login Form</h2>
                <form onSubmit={this.handleLoginForm} method="post">
                    <div className="container">
                        <h3>{this.state.successMessage}</h3>
                        <label for="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" onChange={this.handleInputChange} value={this.state.email} required />

                        <label for="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" onChange={this.handleInputChange} value={this.state.password} required />
                            
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
}

export default Login;