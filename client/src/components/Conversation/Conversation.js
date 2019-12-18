import React from 'react';
import { Redirect } from 'react-router-dom';
import ConversationForm from './ConversationForm';
import ConversationMain from './ConversationMain';
import ConversationDisconnect from './ConversationDisconnect';
import { connect } from 'react-redux';

const Conversation = ({
    opponent,
    connected,
    nick,
    messagess,
    socket,
    searchNew,
}) => {
    if (!opponent) return <Redirect to="/" />;

    const handleSearchNew = () => {
        socket.emit('search new');
    };

    return (
        <div className="conversation">
            <div className="conversation__box">
                {connected && !searchNew && (
                    <div
                        className="conversation__search-new"
                        onClick={() => handleSearchNew()}
                    >
                        <i className="fas fa-redo-alt"></i>
                    </div>
                )}
                <ConversationMain
                    opponent={opponent}
                    nick={nick}
                    messagess={messagess}
                    connected={connected}
                    searchNew={searchNew}
                />
                {connected && !searchNew ? (
                    <ConversationForm />
                ) : (
                    <ConversationDisconnect />
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    opponent: state.socket.opponent,
    nick: state.socket.nick,
    connected: state.socket.connected,
    messagess: state.socket.messagess,
    socket: state.socket.socket,
    searchNew: state.socket.searchNew,
});

export default connect(mapStateToProps)(Conversation);
