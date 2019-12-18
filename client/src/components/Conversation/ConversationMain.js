import React, { useRef, useEffect } from 'react';

const ConversationMain = ({
    opponent,
    nick,
    messagess,
    connected,
    searchNew,
}) => {
    const messageEl = useRef(null);
    const messagessList =
        messagess &&
        messagess.map((message, index) => (
            <p className="conversation__msg" key={index}>
                <span
                    className={
                        message.nick === nick
                            ? 'conversation__me'
                            : 'conversation__opponent'
                    }
                >
                    {message.nick === nick ? nick : opponent}:{' '}
                </span>
                {message.msg}
            </p>
        ));

    useEffect(() => {
        const scrollHeight = messageEl.current.scrollHeight;
        const height = messageEl.current.offsetHeight;

        messageEl.current.scrollTo(0, scrollHeight - height);
    });

    return (
        <div className="conversation__main" ref={messageEl}>
            <p className="conversation__say-hello">
                Rozpoczęto rozmowę z użytkownikiem <span>{opponent}</span> -
                przywitaj się :)
            </p>
            {messagess && messagessList}
            {!connected && (
                <p className="conversation__dissconected">
                    Osoba, z którą pisałeś się rozłączyła
                </p>
            )}
            {searchNew && (
                <p className="conversation__dissconected">
                    Rozłączyłeś się, trwa wyszukiwanie nowej osoby
                </p>
            )}
        </div>
    );
};

export default ConversationMain;
