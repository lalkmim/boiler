import React, { Component } from 'react';
import { connect } from 'react-redux';

import socket from '../utils/socket';
import store from '../utils/store';

class Users extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        socket.emit('users.load');
        socket.on('users.load.result', (users) => {
            //this.setState({ users: users });
            store.dispatch({
                type: 'USERS_LOAD_SUCCESS',
                users: users
            });
        });
    }
    
    componentWillUnmount() {
        socket.removeAllListeners('users.load.result');
    }

    render() {
        return(
            <div>
                {this.props.users.map(function(item) {
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

const mapStateToProps = function(store) {
    return {
        users: store.usersState.users
    };
};

export default connect(mapStateToProps)(Users);