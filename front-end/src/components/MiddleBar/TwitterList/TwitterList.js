import React, { Component } from 'react';
import SingleTwitt from './SingleTwitt/SingleTwitt';
import './TwitterList.css';
import axios from 'axios';

class TwitterList extends Component{
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
    
    render (){
        return (
            <div className="TwitterList">
                {
                    this.state.tweets.map(function (tweet){
                        return <SingleTwitt singleTweet={tweet} key={tweet._id} />;
                    })
                }
            </div>
        )
    }
}

export default TwitterList;