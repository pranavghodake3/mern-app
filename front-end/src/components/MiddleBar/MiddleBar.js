import React, { Component } from 'react';
import TwitterList from './TwitterList/TwitterList';
import CreateTwit from './CreateTwit/CreateTwit';

class MiddleBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }
    componentDidMount(){
        let authData = localStorage.getItem('authData');
        if(authData){
            this.setState({
                isLogged: true,
            });
        }
    }
    
    render() {
        return (
            <div>
                { this.state.isLogged && <CreateTwit /> }
                <TwitterList />
            </div>
        );
    }
}

export default MiddleBar;