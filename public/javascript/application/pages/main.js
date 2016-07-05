import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalContainer, { INFO } from '../components/modal.container';
import MenuContainer from '../components/menu.container';

import store from '../utils/store';
import socket from '../utils/socket';
import { loginSuccess, logoutSuccess } from '../utils/actions';

class Main extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        socket.emit('me.load');
        socket.on('me.load.result', (user) => {
            let text = '';
            
            if(this.props.user && !user) {
                text = 'User signed out successfully.';
                store.dispatch(logoutSuccess({ 
                    user: user, 
                    message: {
                        type: INFO,
                        text: text 
                    }
                }));
            } else if(!this.props.user && user) {
                text = 'User signed in successfully.';
                store.dispatch(loginSuccess({ 
                    user: user, 
                    message: {
                        type: INFO,
                        text: text
                    }
                }));
            }
        });
    }
    
    render() {
        return(
            <div>
                <ModalContainer />
                <section id="header">
                    <MenuContainer />
                </section>
                <section id="main">
                    {this.props.children}
                </section>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState.user
    };
};

export default connect(mapStateToProps)(Main);