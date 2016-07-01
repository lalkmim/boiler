import { createStore, combineReducers } from 'redux';

import { INFO, WARNING, ERROR } from '../components/modal.container';

const initialUserState = { user: null };
const userReducer = function(state = initialUserState, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
        case 'LOGOUT_SUCCESS':
            return { ...state, user: action.user };
            
        default:
            return state;
    }
};

const initialMessagesState = { messages: [] };
const messagesReducer = function(state = initialMessagesState, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, messages: [ ...state.messages, {
                type: INFO,
                text: 'User signed in successfully.'
            }]};

        case 'LOGOUT_SUCCESS':
            return { ...state, messages: [ ...state.messages, {
                type: INFO,
                text: 'User signed out successfully.'
            }]};
            
        case 'MODAL_CLOSE':
            return { ...state, messages: [] };

        default:
            return state;
    }
};

const initialUsersState = { users: [] };
const usersReducer = function(state = initialUsersState, action) {
    switch(action.type) {
        case 'USERS_LOAD_SUCCESS':
            return { ...state, users: action.users };
            
        default:
            return state;
    }
};

const store = createStore(combineReducers({
    userState: userReducer,
    messagesState: messagesReducer,
    usersState: usersReducer
}));

export default store;