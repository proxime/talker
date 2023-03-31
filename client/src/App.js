import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Lobby from './components/Lobby/Lobby';
import Conversation from './components/Conversation/Conversation';
import { Provider } from 'react-redux';
import store from './store';
import socket from './socket';

import './scss/index.scss';

function App() {
    useEffect(() => {
        socket(store);
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <div className="container">
                    <Route path="/" exact component={Lobby} />
                    <Route
                        path="/conversation"
                        exact
                        component={Conversation}
                    />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
