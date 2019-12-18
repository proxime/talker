import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

const ConversationForm = ({ socket, nick }) => {
    const [msg, setMsg] = useState('');
    const inputEl = useRef(null);

    const submitOnEnter = e => {
        if (e.keyCode === 13) sendMsg(e);
    };

    const sendMsg = e => {
        e.preventDefault();
        if (!msg || !nick) return;
        socket.emit('msg', { nick, msg });
        setMsg('');
    };

    return (
        <div className="conversation__form">
            <form onSubmit={e => sendMsg(e)}>
                <textarea
                    name="text"
                    placeholder="Napisz coś..."
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    onKeyDown={e => submitOnEnter(e)}
                    ref={inputEl}
                ></textarea>
                <button onClick={() => inputEl.current.focus()}>Wyślij</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    socket: state.socket.socket,
    nick: state.socket.nick,
});

export default connect(mapStateToProps)(ConversationForm);
