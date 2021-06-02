import React, { Component } from 'react';
import './CreateTwit.css';
import userProfile from './logged-user-profile.jpeg';

class CreateTwit extends Component{
    constructor(props) {
        super(props);
        
    }
    
    render(){
        return (
            <div className="row create-twit">
                <div className="col-sm user-profile">
                    <img src={userProfile} />
                </div>
                <div className="col-sm">
                    <div>
                        <textarea className='text-area-create-twit' placeholder='Whats happening ?' />
                    </div>
                    <div>
                        <button type='button' className='create-tweet-btn btn btn-info'>Tweet</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTwit;