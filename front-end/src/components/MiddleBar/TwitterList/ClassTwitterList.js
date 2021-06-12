import React, { Component } from 'react';
import SingleTwitt from './SingleTwitt/SingleTwitt';
import './TwitterList.css';
import axios from 'axios';

class ClassTwitterList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
        
    }

    componentDidMount(){
        axios.get('http://localhost:9002/tweets')
        .then((response) => {
            console.log("response: ",response);
            this.setState({tweets: response.data});
        })
        .catch((err) => {
            console.log(err)
        })
    }
    handleViewOtherUserProfile = (email) => {
        console.log('Called twitter list component: '+email);
        this.props.handleViewOtherUserProfile(email);
    }
    
    render (){
        return (
            <div className="TwitterList">
                {
                    this.state.tweets.map((tweet) => {
                        return <SingleTwitt singleTweet={tweet} key={tweet._id} handleViewOtherUserProfile={this.handleViewOtherUserProfile} />;
                    })
                }
            </div>
        )
    }
}

export default ClassTwitterList;