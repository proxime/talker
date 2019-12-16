import {
    SET_USER_NUMBER,
    SET_SOCKET,
    SET_OPPONENT_NICK,
    FIND_USER,
    USER_DISCONNECTED,
    ADD_MESSAGE,
} from './types';

export const setSocekt = socket => dispatch => {
    dispatch({
        type: SET_SOCKET,
        payload: socket,
    });
};

export const setUserNumbers = number => dispatch => {
    dispatch({
        type: SET_USER_NUMBER,
        payload: number,
    });
};

export const findUser = nick => dispatch => {
    dispatch({
        type: FIND_USER,
        payload: nick,
    });
};

export const setOpponentNick = nick => dispatch => {
    dispatch({
        type: SET_OPPONENT_NICK,
        payload: nick,
    });
};

export const userDisconnected = () => dispatch => {
    dispatch({
        type: USER_DISCONNECTED,
    });
};

export const addMessage = ({ nick, msg }) => dispatch => {
    dispatch({
        type: ADD_MESSAGE,
        payload: { nick, msg },
    });
};
