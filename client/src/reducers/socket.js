import {
    SET_USER_NUMBER,
    SET_SOCKET,
    SET_OPPONENT_NICK,
    FIND_USER,
    USER_DISCONNECTED,
    ADD_MESSAGE,
} from '../actions/types';

const initState = {
    socket: null,
    users: 0,
    nick: '',
    opponent: '',
    connected: false,
    messagess: [],
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_SOCKET:
            return {
                ...state,
                socket: payload,
            };
        case SET_USER_NUMBER:
            return {
                ...state,
                users: payload,
            };
        case FIND_USER:
            return {
                ...state,
                nick: payload,
                messagess: [],
            };
        case SET_OPPONENT_NICK:
            return {
                ...state,
                opponent: payload,
                connected: true,
            };
        case USER_DISCONNECTED:
            return {
                ...state,
                connected: false,
            };
        case ADD_MESSAGE:
            return {
                ...state,
                messagess: [...state.messagess, payload],
            };
        default:
            return state;
    }
};
