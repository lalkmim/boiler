import React, { Component } from 'react';
import './modal.view.scss';

class ModalView extends Component {
    constructor(props) {
        super(props);
        
        this.getClassName = this.getClassName.bind(this);
    }
    
    getClassName(type) {
        return 'modal-' + (type ? type : INFO);
    }
    
    renderMessages() {
        let i=0;
        let that = this;
        
        return (
            <ul>
                {this.props.messages.map(function(message) {
                    return <li key={i++} className={that.getClassName(message.type)}>{message.text}</li>;
                })}
            </ul>);
    }
    
    render() {
        return (
            <div id="messagesModal" className={'modal ' + (this.props.show ? 'show' : 'hide' )} onClick={this.props.onClick}>
                <div className="modal-content">
                    <span className="close" onClick={this.props.onClick}>×</span>
                    {this.renderMessages()}
                </div>
            </div>);
    }
}

export default ModalView;
export const INFO = 'i';
export const WARNING = 'w';
export const ERROR = 'e';