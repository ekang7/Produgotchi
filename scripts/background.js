
// // Function to execute a script on a specific tab
// function executeScriptOnTab(tabId, script) {
//   chrome.tabs.executeScript(tabId, { code: script });
// }

// // Function to update the tabs and execute a script on update
// function updateTabsAndExecuteScript() {
//   // Get all tabs
//   chrome.tabs.query({}, function (tabs) {
//     // Loop through each tab
//     tabs.forEach(function (tab) {
//       // Execute the script on the tab
//       executeScriptOnTab(tab.id, 'console.log("Script executed on tab: " + tab.url);');
//     });
//   });
// }

// try {
//     // Listen for tab update event
//     chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//         // Check if the tab has finished loading
//         if (changeInfo.status === 'complete') {
//         // Execute the script on the updated tab
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             files: ['scripts/contentScript.js', 'css/contentScript.css']
//         });
//         chrome.scripting.insertCSS({
//             files: ["css/contentScript.css"],
//             target: { tabId: tab.id },
//           });
//         // executeScriptOnTab(tabId, 'console.log("Script executed on updated tab: " + tab.url);');
//         }
//     });
// } catch (e) {
//     console.log(e);
// }

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    console.log(url);
});


// import { GoogleAuth } from 'google-auth-library';
// test api stuff v2
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
        'Content-Type': 'application/json',
        'X-Goog-User-Project': PROJECT_ID
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));





