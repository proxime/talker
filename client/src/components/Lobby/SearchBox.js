import React, { useState } from 'react';
import Searching from './Searching';
import messagess from '../../img/messagess.svg';
import { connect } from 'react-redux';
import { findUser } from '../../actions/socket';

const SearchBox = ({ socket, findUser }) => {
    const [nick, setNick] = useState('');
    const [search, setSearch] = useState(false);

    const searchConversation = e => {
        e.preventDefault();
        if (!nick) return;
        socket.emit('search', nick);
        findUser(nick);
        setSearch(true);
    };

    return (
        <div className="lobby__search-box">
            {search ? (
                <Searching />
            ) : (
                <>
                    <h1 className="lobby__title">Przedstaw się</h1>
                    <form
                        className="lobby__form"
                        onSubmit={e => searchConversation(e)}
                    >
                        <label>
                            <p className="lobby__nick">Twoja Nazwa</p>
                            <input
                                type="text"
                                name="nick"
                                className="lobby__nick-input"
                                value={nick}
                                onChange={e => setNick(e.target.value)}
                            />
                        </label>
                        <button className="lobby__button">
                            Szukaj Rozmowy
                        </button>
                    </form>
                </>
            )}

            <div className="lobby__messagess">
                <img src={messagess} alt="" draggable="false" />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    socket: state.socket.socket,
});

export default connect(mapStateToProps, { findUser })(SearchBox);
