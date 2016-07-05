import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalContainer from '../components/modal.container';
import { INFO } from '../components/modal.view';
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

Main.propTypes = {
    user: React.PropTypes.shape({
        id: React.PropTypes.number,
        name: React.PropTypes.string,
        email: React.PropTypes.string
    })
};

const mapStateToProps = function(store) {
    return {
        user: store.userState.user
    };
};

export default connect(mapStateToProps)(Main);