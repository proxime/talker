import io from 'socket.io-client';
import {
    setSocekt,
    setUserNumbers,
    setOpponentNick,
    userDisconnected,
    addMessage,
    findUser,
    searchNew,
} from './actions/socket';

export default store => {
    // const serverAddress = 'http://localhost:5000';
    const deployAddress = '/';

    const socket = io(deployAddress);

    store.dispatch(setSocekt(socket));

    socket.on('usersLength', number => store.dispatch(setUserNumbers(number)));

    socket.on('findChat', nick => {
        store.dispatch(setOpponentNick(nick));
        store.dispatch(findUser(store.getState().socket.nick));
    });

    socket.on('closed', () => store.dispatch(userDisconnected()));

    socket.on('msg', ({ nick, msg }) =>
        store.dispatch(addMessage({ nick, msg }))
    );

    socket.on('search new', () => store.dispatch(searchNew()));
};
