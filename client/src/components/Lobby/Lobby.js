import React from 'react';
import SearchBox from './SearchBox';
import LeftSide from './LeftSide';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Lobby = ({ connected }) => {
    if (connected) return <Redirect to="/conversation" />;

    return (
        <div className="lobby">
            <LeftSide />
            <SearchBox />
        </div>
    );
};

const mapStateToProps = state => ({
    connected: state.socket.connected,
});

export default connect(mapStateToProps)(Lobby);
