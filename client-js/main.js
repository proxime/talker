const socket = io('http://localhost:5000');

const form = document.querySelector('.search-form');
const onlineNumbers = document.querySelector('.online__numbers');
// const chat = document.querySelector('.chat');

socket.on('usersLength', activeUsers => {
    onlineNumbers.textContent = activeUsers;
});

socket.on('chat', user => {
    // chat.textContent = user;
});

const loadElement = element => {
    const rootEl = document.querySelector('.root');
    rootEl.textContent = '';
    rootEl.appendChild(element);
};

const createSelect = () => {
    const selectContainer = document.createElement('div');
    const selectEl = document.createElement('div');
    const selectTitle = document.createElement('h1');
    const searchForm = document.createElement('form');
    const searchFormLabel = document.createElement('label');
    const searchFormLabelText = document.createElement('p');
    const searchFormLabelInput = document.createElement('input');
    const searchFormButton = document.createElement('button');

    selectContainer.className = 'select-container';
    selectEl.className = 'select';
    searchForm.className = 'search-form';

    selectTitle.textContent = 'Wyszukaj Rozmówcy';
    searchFormLabelText.textContent = 'Wprowadź Swój Nick';
    searchFormButton.textContent = 'Szukaj';

    searchFormLabelInput.type = 'text';
    searchFormLabelInput.name = 'nick';

    searchFormLabel.appendChild(searchFormLabelText);
    searchFormLabel.appendChild(searchFormLabelInput);

    searchForm.appendChild(searchFormLabel);
    searchForm.appendChild(searchFormButton);

    selectEl.appendChild(selectTitle);
    selectEl.appendChild(searchForm);

    selectContainer.appendChild(selectEl);

    searchForm.addEventListener('submit', e => {
        e.preventDefault();
        const nick = e.target.nick.value;
        if (!nick) return;
        socket.emit('search', nick);
        e.target.nick.value = '';
    });

    loadElement(selectContainer);
};

createSelect();
