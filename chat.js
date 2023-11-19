const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const PROJECT_ID = "produguchi";
const MODEL_ID = "chat-bison";
const LOCATION_ID = "us-central1";

// const accessToken = 'ya29.a0AfB_byAbrxXM8T84mgel9JMw8mxPLFrjUO8_4D9I2-XIYnBJpJ6WcL-Gf4cwoEHNdSyXEh9aI3p4mOwdbnykqMvhLxcx4_e8Nb_qropxpjKCuS-ob_mM6FGmJw6XxvQ0CQ2271zoTnZT808_tSChgDhJ5VcRXbTqWubaPbqEIdtzg8HZbVRa3vGcu_gLk-DZ7Qy_qpCs7TckkG6e8_4GlweYH0fKzQMIDmNUb-W_JLWqR273fM6IPVXT2KPbAKtAEl9f29-uWPZJ6RLSid24evVPtPxvPbqyl0zPVSy1lQydIa-jBsKy8O4KJHnIN0IgRR96R16qUEpHFvu2HAo7KcWZNwnwZ1Z6c0XuS5mRbYzgPlh8R1DOX4_yuG8p4p1H9VzASjlSbkkIaA8TFy2h2vJFOu9TMl0aCgYKATYSARESFQHGX2MitSgaNtsQV_bWmA8VlU0JNw0422'; // You need to obtain this through OAuth 2.0
const accessToken = 'ya29.a0AfB_byAOjtq1CtuxWKc7Vpr_0PjBE9k2H84gOY25WWSXDmlUvS7Dj0IsOtOJOaf7pZ6llzIHnzIM5qOJbEyY3c5lYT_IjWCrxi0ESD_kQYnTlIJ81kDmUqyqN6unGIj2BqUusqtHnYI3tttOOWkY-s6T-phcnfz9M1seiN9qAWAA6CSJ3eh5-EwHCThybGQqDol-Fklb6TlYl03dlXr-g0bqX-u403T4BDJMuxTPXvlgmRVVKEFu3Rl76Q7V5IpS1KhK8WqgCPhRti74bLgjPjHzjBYz9-U6PoUkE8oAAEW3TSHo6MjFvJO0B3tyFoZOHZUfw4t4VwJRvI4nygs5bTW2qcgzx5XMdhbv0IHRhk5jEoEF81_zxbMAtEXonffH0OZVk4MyI7PgfCseQiY_bTsqSkykKEwaCgYKATASARESFQHGX2Mi8l1eHtUZZdzPDh3Je0PGJA0422'; // You need to obtain this through OAuth 2.0
// Import the Google Auth Library


// Define your key file and scopes
// const keyFile = 'key.json'; // Path to your JSON key file
// const scopes = 'https://www.googleapis.com/auth/cloud-platform';

// // Create a Google Auth client
// const auth = new GoogleAuth({
//   keyFile: keyFile,
//   scopes: scopes,
// });

// const client = auth.getClient();
// const accessToken = client.getAccessToken();

const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predict`;

let data = {
    "instances": [
        {
            "context": "You are a helpful, playful dog assistant. You help others with productivity by giving helpful tips, and helping them stay accountable.",
            "examples": [
                {
                    "input": {
                        "author": "user",
                        "content": "I want to write a history essay"
                    },
                    "output": {
                        "author": "bot",
                        "content": "Woof that sounds great! What will the essay be about?"
                    }
                },
                {
                    "input": {
                        "author": "user",
                        "content": "I want to create a powerpoint. "
                    },
                    "output": {
                        "author": "bot",
                        "content": "That sounds great! What will the powerpoint be about? Woof"
                    }
                }
            ],
            "messages": [
                {
                    "author": "user",
                    "content": "hi"
                },
                {
                    "author": "bot",
                    "content": " Hello! How can I help you today? "
                },
                {
                    "author": "user",
                    "content": "I want to write a history essay"
                },
                {
                    "author": "bot",
                    "content": " Great idea! Writing a history essay can be a lot of fun. Here are some tips to get you started..."
                },
                {
                    "author": "user",
                    "content": "I want to write a science paper"
                }
            ]
        }
    ],
    "parameters": {
        "candidateCount": 1,
        "maxOutputTokens": 184,
        "temperature": 0.2,
        "topP": 0.53,
        "topK": 12
    }
};

function talkToDog(newMessage) {
    data.instances[0].messages.push({
        "author": "user",
        "content": newMessage
    });
    alert("New message is " + newMessage);
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Goog-User-Project': PROJECT_ID
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    alert("Response is " + reponse.json());
    alert("Data is " + data);
}


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
        talkToDog(userMessage); 
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
