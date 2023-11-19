function postChatMessages(chatMessage) {
    // The URL of your Flask endpoint
    const url = 'https://5000-cs-52c014e8-fcf8-44eb-bf20-a3ccaf8f5fe9.cs-us-east1-pkhd.cloudshell.dev/chat';

    // Prepare the headers
    const headers = {
        'Content-Type': 'application/json',
    };

    // Prepare the body of the POST request
    const body = JSON.stringify(chatMessage);

    // Make the POST request
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Example usage
const chatMessage = [
    { user: 'Alice', message: 'Hi there!' },
    { user: 'Bob', message: 'Hello!' }
];

postChatMessages(chatMessage);