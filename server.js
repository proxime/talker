const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const uuidv4 = require('uuid/v4');

app.use(express.json());

let users = [];
let conversations = [];

io.on('connection', socket => {
    io.emit('usersLength', io.engine.clientsCount);

    socket.on('search', async nick => {
        const userExists = users.findIndex(user => user.id === socket.id);

        if (userExists > -1) {
            users[userExists].nick = nick;
        } else {
            const newUser = {
                id: socket.id,
                nick,
                socket,
            };

            users.push(newUser);
        }

        // Search for user
        if (users.length >= 2) {
            let randomUser = users[Math.floor(Math.random() * users.length)];
            while (randomUser.id === socket.id)
                randomUser = users[Math.floor(Math.random() * users.length)];

            const newConveration = {
                id: uuidv4(),
                users: {
                    user1: null,
                    user2: null,
                },
            };

            // Adding users to new conversation
            users.forEach(user => {
                if (user.id === socket.id) newConveration.users.user1 = user;
                else if (user.id === randomUser.id)
                    newConveration.users.user2 = user;
            });

            conversations.push(newConveration);

            const { user1, user2 } = newConveration.users;

            user1.socket.join(newConveration.id);
            user2.socket.join(newConveration.id);

            // Emiting found person
            user1.socket.emit('findChat', user2.nick);
            user2.socket.emit('findChat', user1.nick);

            // Emiting messages to client
            user1.socket.on('msg', function({ nick, msg }) {
                io.to(newConveration.id).emit('msg', { nick, msg });
            });

            user2.socket.on('msg', function({ nick, msg }) {
                io.to(newConveration.id).emit('msg', { nick, msg });
            });

            // Searchnig new person
            const searchNew = (actuallUser, otherUser) => {
                actuallUser.socket.removeAllListeners('msg');
                otherUser.socket.removeAllListeners('msg');
                actuallUser.socket.removeAllListeners('search new');
                otherUser.socket.removeAllListeners('search new');

                actuallUser.socket.broadcast
                    .to(newConveration.id)
                    .emit('closed');
                actuallUser.socket.emit('search new');

                actuallUser.socket.leave(newConveration.id);
                otherUser.socket.leave(newConveration.id);

                conversations = conversations.filter(
                    conversation => conversation.id !== newConveration.id
                );
            };

            user1.socket.on('search new', () => searchNew(user1, user2));
            user2.socket.on('search new', () => searchNew(user2, user1));

            // Delete user from users who are searching conversation
            users = users.filter(
                user => user.id !== socket.id && user.id !== randomUser.id
            );
        }
    });

    socket.on('disconnect', () => {
        io.emit('usersLength', io.engine.clientsCount);

        // Check if user is in conversation
        const talking = conversations.findIndex(
            conversation =>
                conversation.users.user1.id === socket.id ||
                conversation.users.user2.id === socket.id
        );

        if (talking > -1) {
            const conversation = conversations[talking];
            io.to(conversation.id).emit('closed');

            conversation.users.user1.socket.removeAllListeners('msg');
            conversation.users.user2.socket.removeAllListeners('msg');
            conversation.users.user1.socket.removeAllListeners('search new');
            conversation.users.user2.socket.removeAllListeners('search new');

            conversation.users.user1.socket.leave(conversation.id);
            conversation.users.user2.socket.leave(conversation.id);

            conversations = conversations.filter(
                conv => conv.id !== conversation.id
            );
        } else {
            users = users.filter(user => user.id !== socket.id);
        }
    });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => console.log(`Server started on port ${PORT}`));
