import React from 'react';
import { Link } from 'react-router';
import config from '../../../app/config';

let Main = React.createClass({
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
                                        <Link className="navbar-link" to="/login">Login</Link>
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
});

export default Main;