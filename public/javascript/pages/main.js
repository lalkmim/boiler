import React, { Component } from 'react';
import { Link } from 'react-router';

import './main.menu.scss';
import config from '../../../app/config';
import socket from '../socket';

export default class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user: null
        };
    }
    
    componentDidMount() {
        socket.emit('me.load');
        socket.on('me.load.result', (user) => {
            this.setState({ user: user });
        });
    }
    
    onLogout() {
        socket.emit('me.load', { logout: true });
    }
    
    loginLogoutLink() {
        if(this.state.user) {
            return <Link className="navbar-link" to="/" onClick={this.onLogout}>Logout</Link>;
        } else {
            return <Link className="navbar-link" to="/login">Login</Link>;
        }
    }
    
    render() {
        return(
            <div>
                <section id="header">
                    <div className="row">
                        <div className="five columns">
                            <h1 className="title">{config.site.name}</h1>
                        </div>
                        <div className="seven columns">
                            <div className="navbar-spacer" />
                            <div className="navbar-item navbar-menu">
                                <a className="navbar-link" href="#">&#9776;</a>
                            </div>
                            <nav className="navbar">
                                <ul className="navbar-list">
                                    <li className="navbar-item">
                                        <Link className="navbar-link" to="/">Home</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link className="navbar-link" to="/users">Users</Link>
                                    </li>
                                    <li className="navbar-item">
                                        {this.loginLogoutLink()}
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <section id="main">
                    {this.props.children}
                </section>
            </div>
        );
    }
}