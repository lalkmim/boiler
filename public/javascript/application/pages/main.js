import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalContainer, { INFO } from '../components/modal.container';
import MenuContainer from '../components/menu.container';

import store from '../utils/store';
import socket from '../utils/socket';

class Main extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        socket.emit('me.load');
        socket.on('me.load.result', (user) => {
            let type = null;
            
            if(this.props.user && !user) {
                type = 'LOGOUT_SUCCESS';
            } else if(!this.props.user && user) {
                type = 'LOGIN_SUCCESS';
            }
            
            if(type) {
                store.dispatch({
                    type: type,
                    user: user
                });
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