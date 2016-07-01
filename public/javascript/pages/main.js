import React, { Component } from 'react';
import ModalContainer, { INFO } from '../components/modal.container';
import MenuContainer from '../components/menu.container';

import socket from '../socket';

export default class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user: null,
            messages: []
        };
        
        this.onClose = this.onClose.bind(this);
    }
    
    componentDidMount() {
        socket.emit('me.load');
        socket.on('me.load.result', (user) => {
            if(this.state.user && !user) {
                this.setState({
                    messages: this.state.messages.concat([{
                        type: INFO,
                        text: 'User logged out successfully.'
                    }])
                });
            } else if(!this.state.user && user) {
                this.setState({
                    messages: this.state.messages.concat([{
                        type: INFO,
                        text: 'User logged in successfully.'
                    }])
                });
            }
            
            this.setState({ user: user });
        });
    }
    
    onClose() {
        this.setState({
            messages: []
        });
    }
    
    render() {
        return(
            <div>
                <ModalContainer messages={this.state.messages} onClose={this.onClose} />
                <section id="header">
                    <MenuContainer user={this.state.user} />
                </section>
                <section id="main">
                    {this.props.children}
                </section>
            </div>
        );
    }
}