import React, { Component } from 'react';

import socket from '../socket';

import MenuView from './menu.view';

class MenuContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    onLogout() {
        socket.emit('me.load', { logout: true });
    }
    
    render() {
        return (<MenuView siteName="boiler-pes3" user={this.props.user} onLogout={this.onLogout} />);
    }
}

export default MenuContainer;