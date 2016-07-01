import React, { Component } from 'react';
import ModalView, { INFO, WARNING, ERROR } from './modal.view';
import $ from 'jquery';

class ModalContainer extends Component {
    constructor(props) {
        super(props);
        
        this.closeModal = this.closeModal.bind(this);
    }
    
    openModal() {
        $('#messagesModal').show();
    }
    
    shouldShow() {
        return (this.props.messages.length > 0);
    }
    
    closeModal(event) {
        var modal = $('#messagesModal');
        var close = $('#messagesModal .close');
        var target = event.target;
        
        if (target == modal[0] || target == close[0]) {
            this.props.onClose();
        }
    }
    
    render() {
        return (<ModalView show={this.shouldShow()} messages={this.props.messages} onClick={this.closeModal} />);
    }
}

export default ModalContainer;