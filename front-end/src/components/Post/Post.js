import React from 'react';
import axios from 'axios';
import './post.css';

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }
    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(response =>{
          console.log("response: ",response);
          this.setState({posts: response.data});
        })
        .catch(error => {
          console.log("Something went wrong");
        })
      }

    render(){
        return (
            <div className="posts">
                <h1>Listing Posts</h1>
                {
                this.state.posts.map(post => 
                    post.id <= 5 ? 
                    <div className="single-post">
                        <div className="post-id">{post.id}</div>
                        <div className="post-title">{post.title}</div>
                        <div className="post-body">{post.body}</div>
                    </div>
                    : null
                )
                }
            </div>
        )
    }
}

export default Post;