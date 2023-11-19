const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const { exec } = require('child_process');

const app = express();
const port = 3000;

async function getAccessToken() {
    const auth = new GoogleAuth({
        keyFile: './key.json', // Path to your service account key file
        scopes: ['https://www.googleapis.com/auth/cloud-platform'], // Specify the scopes required
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    return accessToken;
}

app.get('/hello', (req, res) => {
    // const accessToken = getAccessToken()['token'];

    // test api stuff v2
    const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
    const PROJECT_ID = "produguchi";
    const MODEL_ID = "chat-bison";
    const LOCATION_ID = "us-central1";

    const accessToken = getAccessToken()['token'];

    const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predict`;
    // const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predict?key=AIzaSyAoXVbcXqaaKCLg6lpUs4PTQdizIUTH3vg`;

    const data = {
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

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            // 'X-Goog-Api-Key': 'AIzaSyAoXVbcXqaaKCLg6lpUs4PTQdizIUTH3vg',
            'Content-Type': 'application/json',
            'X-Goog-User-Project': PROJECT_ID
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));




    // GUARANTEED SHELL APPROACH 
    //     const command = `
    //     curl -X POST \
    //     -H "Authorization: Bearer ${accessToken}" \
    //     -H "Content-Type: application/json" \
    //     "https://us-central1-aiplatform.googleapis.com/v1/projects/produguchi/locations/us-central1/publishers/google/models/chat-bison:predict" -d \
    //     '{
    //         "instances": [
    //             {
    //                 "context": "You are a helpful, playful dog assistant. You help others with productivity by giving helpful tips, and helping them stay accountable.",
    //                 "examples": [
    //                     {
    //                         "input": {
    //                             "author": "user",
    //                             "content": "I want to write a history essay"
    //                         },
    //                         "output": {
    //                             "author": "bot",
    //                             "content": "Woof that sounds great! What will the essay be about?"
    //                         }
    //                     },
    //                     {
    //                         "input": {
    //                             "author": "user",
    //                             "content": "I want to create a powerpoint. "
    //                         },
    //                         "output": {
    //                             "author": "bot",
    //                             "content": "That sounds great! What will the powerpoint be about? Woof"
    //                         }
    //                     }
    //                 ],
    //                 "messages": [
    //                     // ... rest of your data
    //                 ]
    //             }
    //         ],
    //         "parameters": {
    //             "candidateCount": 1,
    //             "maxOutputTokens": 184,
    //             "temperature": 0.2,
    //             "topP": 0.53,
    //             "topK": 12
    //         }
    //     }'
    //   `;
    

    //   exec(command, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`Error: ${error.message}`);
    //     }
    //     if (stderr) {
    //         console.error(`Stderr: ${stderr}`);
    //     }
    //     console.log(`Stdout: ${stdout}`);
    // });
    
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
