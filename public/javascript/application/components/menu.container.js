import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuView from './menu.view';

import socket from '../utils/socket';

class MenuContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    handleLogout() {
        socket.emit('me.load', { logout: true });
    }
    
    render() {
        return (<MenuView siteName="boiler-pes3" user={this.props.user} handleLogout={this.handleLogout} />);
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState.user
    };
};

export default connect(mapStateToProps)(MenuContainer);