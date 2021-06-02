import React, { Component } from 'react';
import './CreateTwit.css';
import userProfile from './logged-user-profile.jpeg';
import axios from 'axios';

class CreateTwit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
    }
    handleTweetSubmit = (e) => {
        e.preventDefault();
        console.log("ssss: ",this.state);
        const data = {
            content: this.state.content
        };
        axios.post('http://localhost:9002/tweets', data)
        .then((res) => {
            console.log('success: ',res.data);
            this.setState({ content: '' });
        })
        .catch((err) => {
            console.log('Posting tweet having error: ', err)
        })
    }
    handleTweetContentChange = (e) => {
        this.setState({ content: e.target.value });
    }
    
    
    render(){
        return (
            <div className="row create-twit">
                <div className="col-sm user-profile">
                    <img src={userProfile} alt='User Profile' />
                </div>
                <div className="col-sm">
                    <form onSubmit={this.handleTweetSubmit}>
                        <div>
                            <textarea className='text-area-create-twit' placeholder='Whats happening ?' required='required' onChange={this.handleTweetContentChange} value={this.state.content} />
                        </div>
                        <div>
                            <button type='submit' className='create-tweet-btn btn btn-info'>Tweet</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateTwit;