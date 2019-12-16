import React from 'react';
import { connect } from 'react-redux';

const Navbar = ({ users }) => {
    return (
        <nav className="navbar">
            <div className="navbar__title">Talker</div>
            <div className="navbar__online">
                <div className="navbar__online-number">{users}</div>
                <div className="navbar__online-icon">
                    <i className="fas fa-user-friends"></i>
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({
    users: state.socket.users,
});

export default connect(mapStateToProps)(Navbar);
