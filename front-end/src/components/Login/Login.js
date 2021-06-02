import React from 'react';
import './login.css';

class Login extends React.Component{
    render(){
        return (
            <div className='container'>
                <h2>Login Form</h2>
                <form action="/action_page.php" method="post">
                    <div className="container">
                        <label for="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required />

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required />
                            
                        <button type="submit">Login</button>
                    </div>

                    <div className="container">
                        <a href="/" className="cancelbtn">Cancel</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;