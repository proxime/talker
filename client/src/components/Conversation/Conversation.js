import React from 'react';
import { Redirect } from 'react-router-dom';
import ConversationForm from './ConversationForm';
import ConversationMain from './ConversationMain';
import ConversationDisconnect from './ConversationDisconnect';
import { connect } from 'react-redux';

const Conversation = ({ opponent, connected, nick, messagess }) => {
    if (!opponent) return <Redirect to="/" />;

    return (
        <div className="conversation">
            <div className="conversation__box">
                <ConversationMain
                    opponent={opponent}
                    nick={nick}
                    messagess={messagess}
                    connected={connected}
                />
                {connected ? <ConversationForm /> : <ConversationDisconnect />}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    opponent: state.socket.opponent,
    nick: state.socket.nick,
    connected: state.socket.connected,
    messagess: state.socket.messagess,
});

export default connect(mapStateToProps)(Conversation);
