const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const PROJECT_ID = "produguchi";
const MODEL_ID = "chat-bison";
const LOCATION_ID = "us-central1";

// const accessToken = 'OAuth 2.0
const accessToken = 'ya29.a0AfB_byDqCjVxWjotXqrYH7FaLUR754BtPFThnuKseVHH1RJCLyXXPID_ajmXpzn0W8oRMsJj6k5JZJN0CGhduIugJUrUfB0UUvFxgyAQxwYVi4ckmxvbMawsPxG9Uap71NlUUks9UbmCcGL4Z4dSRsDnGs0-UwirAqaZIjxikDfhpHX4b8ryd829vMB3A9v7uaajlqLAJP03cWxZp5l9gBqJ4q47nHrpRZETm9z_vnv1ciin-G7KX9owcxdEj67hjGtqoi7A1eRHKNYjTjayBHh8JY0B2CO7Abxem_I5rx1U8ZoHSlZLN-Et5xhv1t_2V84v0DKDPeqKVLh7THYG25qobYyH6xuq6UnDE7m5e-u6TgGi3mn0C3nONhFjSEO6i_OcEOQWjBwQWmKfmUOPvLbJcYv29_zcaCgYKAS0SARESFQHGX2MiSMS9n6y2FE3O-7vAeF80cQ0423'; // You need to obtain this through OAuth 2.0
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

// // Create chat history area
// const chatHistory = document.createElement('div');
// chatHistory.id = 'dogChatHistory';
// chatContainer.appendChild(chatHistory);

// // Create input area
// const chatInput = document.createElement('input');
// chatInput.type = 'text';
// chatInput.placeholder = 'Type a message...';
// chatContainer.appendChild(chatInput);

// document.body.appendChild(chatContainer);

// // Focus on the input field whenever the chat window is clicked
// chatContainer.addEventListener('click', () => {
//     chatInput.focus();
// });

// chatInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter' && chatInput.value.trim() !== '') {
//         const userMessage = document.createElement('div');
//         userMessage.textContent = chatInput.value;
//         userMessage.classList.add('user-message');
//         chatHistory.appendChild(userMessage);
//         talkToDog(userMessage); 
//         chatInput.value = '';

//         setTimeout(() => {
//             const dogResponse = document.createElement('div');
//             dogResponse.textContent = 'Woof';
//             dogResponse.classList.add('dog-response');
//             chatHistory.appendChild(dogResponse);

//             chatHistory.scrollTop = chatHistory.scrollHeight;
//         }, 500);
//     }
// });
