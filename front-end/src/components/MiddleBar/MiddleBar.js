import React, { Component } from 'react';
import TwitterList from './TwitterList/TwitterList';
import CreateTwit from './CreateTwit/CreateTwit';

class MiddleBar extends Component {
    render() {
        return (
            <div>
                <CreateTwit />
                <TwitterList />
            </div>
        );
    }
}

export default MiddleBar;