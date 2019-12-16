import React, { useState } from 'react';
import { connect } from 'react-redux';

const ConversationDisconnect = ({ socket, nick }) => {
    const [search, setSearch] = useState(false);

    const searchNewUser = () => {
        socket.emit('search', nick);
        setSearch(true);
    };

    return (
        <div className="conversation__disconnect">
            {search ? (
                <p className="conversation__searching">Wyszukiwanie...</p>
            ) : (
                <>
                    <div className="conversation__disconnect-text">
                        Osoba, z którą pisałeś się rozłączyła
                    </div>
                    <div
                        className="conversation__disconnect-button"
                        onClick={() => searchNewUser()}
                    >
                        <p>Znajdź</p>
                        <p>Rozmowę</p>
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    socket: state.socket.socket,
    nick: state.socket.nick,
});

export default connect(mapStateToProps)(ConversationDisconnect);
