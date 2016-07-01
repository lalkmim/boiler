import React, { Component } from 'react';
import { connect } from 'react-redux';

import $ from 'jquery';

import ModalView, { INFO, WARNING, ERROR } from './modal.view';

import store from '../utils/store';

class ModalContainer extends Component {
    constructor(props) {
        super(props);
        
        this.closeModal = this.closeModal.bind(this);
        //this.onClose = this.onClose.bind(this);
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
            this.onClose();
        }
    }
    
    onClose() {
        store.dispatch({
            type: 'MODAL_CLOSE',
            messages: []
        });
    }
    
    render() {
        return (<ModalView show={this.shouldShow()} messages={this.props.messages} onClick={this.closeModal} />);
    }
}

const mapStateToProps = function(store) {
    return {
        messages: store.messagesState.messages
    };
};

export default connect(mapStateToProps)(ModalContainer);