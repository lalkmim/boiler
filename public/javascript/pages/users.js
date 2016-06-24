import React from 'react';

import socket from '../socket';

let Users = React.createClass({
    getInitialState: function() {
        socket.emit('users.load');
        return { users: [] };
    },
    
    componentDidMount() {
        socket.on('users.load.result', this._loadUsers);
    },

    _loadUsers: function(users) {
        console.log('<<< users.load');
        this.setState({ users: users });
    },
    
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
});

export default Users;