import { combineReducers } from 'redux';
import users from './users';
import socket from './socket';

const rootReducer = combineReducers({
    users,
    socket,
});

export default rootReducer;
