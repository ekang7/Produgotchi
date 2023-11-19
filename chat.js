// Create chat window container
const chatContainer = document.createElement('div');
chatContainer.id = 'dogChatContainer';

// Create chat history area
const chatHistory = document.createElement('div');
chatHistory.id = 'dogChatHistory';
chatContainer.appendChild(chatHistory);

// Create input area
const chatInput = document.createElement('input');
chatInput.type = 'text';
chatInput.placeholder = 'Type a message...';
chatContainer.appendChild(chatInput);

document.body.appendChild(chatContainer);

// Focus on the input field whenever the chat window is clicked
chatContainer.addEventListener('click', () => {
    chatInput.focus();
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        const userMessage = document.createElement('div');
        userMessage.textContent = chatInput.value;
        userMessage.classList.add('user-message');
        chatHistory.appendChild(userMessage);

        chatInput.value = '';

        setTimeout(() => {
            const dogResponse = document.createElement('div');
            dogResponse.textContent = 'Woof';
            dogResponse.classList.add('dog-response');
            chatHistory.appendChild(dogResponse);

            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 500);
    }
});
