import React, { Component } from 'react';

import socket from '../socket';

export default class Users extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            users: []
        };
    }
    
    componentDidMount() {
        socket.emit('users.load');
        socket.on('users.load.result', (users) => {
            this.setState({ users: users });
        });
    }
    
    componentWillUnmount() {
        socket.removeAllListeners('users.load.result');
    }

    render() {
        return(
            <div>
                {this.state.users.map(function(item) {
                    return(
                        <div key={item.id} className="row">
                            <div className="two columns">
                                <p>{item.id}</p>
                            </div>
                            <div className="five columns">
                                <p>{item.name}</p>
                            </div>
                            <div className="five columns">
                                <p>{item.email}</p>
                            </div>
                        </div>);
                })};
            </div>
        );
    }
}