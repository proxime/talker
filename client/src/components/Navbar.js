import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ users }) => {
    return (
        <nav className="navbar">
            <div className="navbar__title">Talker</div>
            <div className="navbar__online">
                <div className="navbar__online-number">{users}</div>
                <div className="navbar__online-icon">
                    <FontAwesomeIcon icon={faUserFriends} />
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => ({
    users: state.socket.users,
});

export default connect(mapStateToProps)(Navbar);
