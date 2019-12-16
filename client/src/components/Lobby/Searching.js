import React from 'react';

const Searching = () => {
    return (
        <>
            <h1 className="lobby__title">Wyszukiwanie...</h1>
            <div className="lobby__searching">
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default Searching;
