// Create the draggable element
const draggableElement = document.createElement('div');
draggableElement.id = 'myDraggableImageWrapper';
draggableElement.innerText = 'Drag me!';

// Create the dog element
const dogSprite = document.createElement('img');
dogSprite.id = 'dogSprite'
dogSprite.src = chrome.runtime.getURL('images/SVG/neutral.svg'); // Adjust the file name if necessary
dogSprite.style.width = '100%'; // Make the image fit the wrapper div
dogSprite.style.height = '100%'; // Make the image fit the wrapper div

function updateDogImage(clickCount) {
    let imageSrc;
    if (clickCount < 10) {
        imageSrc = 'images/SVG/sad.svg';
    } else if (clickCount < 20) {
        imageSrc = 'images/SVG/neutral.svg';
    } else {
        imageSrc = 'images/SVG/happy.svg';
    }
    dogSprite.src = chrome.runtime.getURL(imageSrc);
}

// Initialize the dog sprite with the correct image on load
chrome.storage.local.get(['dogClickCount'], (result) => {
    updateDogImage(result.dogClickCount || 0);
});

// Create a button
const dogButton = document.createElement('button');
dogButton.innerText = 'Pet';
dogButton.className = 'button';

dogButton.addEventListener('click', () => {
    chrome.storage.local.get(['dogClickCount'], (result) => {
        let count = result.dogClickCount || 0;
        count++;
        console.log('Dog clicked! Count: ' + count);
        chrome.storage.local.set({'dogClickCount': count}, () => {
            updateDogImage(count);
        });
    });

    chrome.storage.sync.set({ chatHistory: [] });

});

// Create a button
const button = document.createElement('button');
button.innerText = 'Ask';
button.className = 'button';

/*
// Create a blue box container
const blueBox = document.createElement('div');
blueBox.className = 'blue-box';

// Create a red square
const redSquare = document.createElement('div');
redSquare.className = 'red-square';

// Create an output area
const outputArea = document.createElement('div');
outputArea.className = 'output-area';

// Create a text input
const textBox = document.createElement('input');
textBox.type = 'text';
textBox.className = 'text-box';

// Event listener for the text box
textBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        outputArea.innerText = textBox.value;
        textBox.value = '';
    }
});

// Event listener to clear the text box on click
textBox.addEventListener('click', function () {
    textBox.value = '';
});

// Event listener for the red square (example logic)
redSquare.addEventListener('click', function () {
  console.log('Red square clicked! Processing logic...');
  blueBox.style.display = 'none';
  textBox.style.display = 'none';
  outputArea.style.display = 'none';
});

// Append the output area and text box to the blue box
blueBox.appendChild(outputArea);
blueBox.appendChild(textBox);
blueBox.appendChild(redSquare);
draggableElement.appendChild(blueBox);
*/

// Create chat window container
const chatContainer = document.createElement('div');
chatContainer.id = 'dogChatContainer';

// Create chat history area
const chatHistory = document.createElement('div');
chatHistory.id = 'dogChatHistory';
chatContainer.appendChild(chatHistory);

// document.addEventListener('DOMContentLoaded', function() {
//     console.log('DOM fully loaded and parsed');
//     chrome.storage.sync.get({ chatHistory: [] }, function (data) {
//         for (let i = 0; i < data.chatHistory.length; i++) {
//             console.log(data.chatHistory);
//             const chatMessage = document.createElement('div');
//             chatMessage.textContent = data[i].message;
//             chatMessage.classList.add(data[i].type); // 'user-message' or 'dog-response'
//             chatHistory.appendChild(chatMessage);
//         }
//     });
// })

// Create a red square
const redSquare = document.createElement('div');
redSquare.className = 'red-square';
chatContainer.appendChild(redSquare);

// Create input area
const chatInput = document.createElement('input');
chatInput.type = 'text';
chatInput.placeholder = 'Type a message...';
chatContainer.appendChild(chatInput);

// Focus on the input field whenever the chat window is clicked
chatContainer.addEventListener('click', () => {
    chatInput.focus();
});

// Function to add a message to chat history and save it
function addMessageToChatHistory(message, type) {
    const chatMessage = document.createElement('div');
    chatMessage.textContent = message;
    chatMessage.classList.add(type); // 'user-message' or 'dog-response'
    chatHistory.appendChild(chatMessage);

    // Save the message to storage
    chrome.storage.sync.get({ chatHistory: [] }, function (data) {
        const updatedHistory = data.chatHistory;
        // updatedHistory.push({ message, type });
        const author = type === 'user-message' ? 'user' : 'bot';
        updatedHistory.push({ "author": author, "content": message });
        chrome.storage.sync.set({ chatHistory: updatedHistory });
    });
}


// Modify your existing event listener for chat input
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        // Add user message to chat history
        addMessageToChatHistory(chatInput.value, 'user-message');
        chatInput.value = '';
        talkToDog();

        // Simulate dog's response
        // setTimeout(() => {
        //     addMessageToChatHistory('Woof', 'dog-response');
        // }, 500);
    }
});


// chatInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter' && chatInput.value.trim() !== '') {
//         const userMessage = document.createElement('div');
//         userMessage.textContent = chatInput.value;
//         userMessage.classList.add('user-message');
//         chatHistory.appendChild(userMessage);

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

// Event listener for the button
button.addEventListener('click', function () {
    if (chatContainer.style.display == 'block') {
      chatContainer.style.display = 'none';
    } else {
      chatContainer.style.display = 'block';
      chatHistory.style.display = 'block';
      chatInput.style.display = 'block';
      chatInput.value = '';
      chatInput.focus();
    }
});

redSquare.addEventListener('click', function () {
    console.log('Red square clicked! Processing logic...');
    chatContainer.style.display = 'none';
  });

// Append the button and blue box to the injectElement
draggableElement.appendChild(dogSprite);
draggableElement.appendChild(button);
draggableElement.appendChild(dogButton);
draggableElement.appendChild(chatContainer);

document.body.appendChild(draggableElement);

// Add drag functionality
let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === draggableElement | e.target === dogSprite) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    active = false;
}

function drag(e) {
    if (active) {
    
        e.preventDefault();
    
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, draggableElement);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// // Timer functionality
// let time = 100;
// let productive = false;

// function timerLoop() {

//     chrome.storage.local.get(['time', 'productive'], (result) => {
//         console.log("Read Time: " + result.time);
//         time = result.time;
//         productive = result.productive;
//     })

//     if (productive) {
//         time ++;
//     } else {
//         time --;
//     }

//     if (time > 100) {
//         time = 100;
//     } else if (time < 0) {
//         time = 0;
//     }

//     console.log("Write Time: " + time);
//     console.log('');
//     chrome.storage.local.set({'time': time});
//     chrome.storage.local.set({'productive': productive});
// }

// setInterval(timerLoop, 1000);
chrome.storage.sync.set({'time': time});
chrome.storage.sync.set({'productive': productive});

console.log('Time: ' + time);

// setInterval(() => console.log(window.location.toString()), 1000);

document.addEventListener('touchstart', dragStart, false);
document.addEventListener('touchend', dragEnd, false);
document.addEventListener('touchmove', drag, false);

document.addEventListener('mousedown', dragStart, false);
document.addEventListener('mouseup', dragEnd, false);
document.addEventListener('mousemove', drag, false);

let url = window.location.toString().substring(0, 4096);
let webcontent = window.document.body.innerText.toString().substring(0, 4096);

console.log(url);
console.log(webcontent);

/*

You are a productivity analyzer, 
and my goal is {goal}. Given the 
url of the webpage I am on and 
the contents of the webpage, 
provide a simple, single response, 
yes or no answer in all lower case 
alphanumeric characters if I am 
being productive on my goal.

URL: {url}
Content: {content}

if url is productive sentiment, happy dog
if url is nonproductive sentiment, sad dog

input prompt

*/

// app stuff starts here:
function getStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(key, (result) => {
            if (chrome.runtime.lastError) {
                // Reject the promise if there's an error
                reject(chrome.runtime.lastError);
            } else {
                // Resolve the promise with the result
                resolve(result[key]);
            }
        });
    });
}

async function talkToDog() {
    const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const PROJECT_ID = "produguchi";
const MODEL_ID = "chat-bison";
const LOCATION_ID = "us-central1";

const accessToken = 'ya29.a0AfB_byCpXEKvr8xRp7IZho-lg5coEKmp_MFeYbBV_rTELudUEVabDiefIPRZi5LwPUkO8wGow36okEE8RN6VvoIohEWPhKEv5oaE9wp-Rmsu5sDGGdGYXUjeXo70pGOIXARkqG_FKOlGGendhXO8KY_tuDkQ8PeyGrGchC6VrKLk7bROcqEkRYILP2vVD1RHPjhbD2_QiDCRTpd8CZJJ48uOK-KG3mZtIgNSfZUHwdX-7_7PRAlbgJmvzRhAh8_k3nAN8y6JQ26NMWIkkPR4-syZedldwcVGfr199Z-XoRSLqzVOPCkltkBi2W3U7NHOPPc5F4OqUSwBI9cnNFJJMIibvhyvUdIvsJA4316lPuLzjYUCF8dc5OCphEuzSXYbsVKfAlLQJwjg0Ovs6H-P_CSWyGmqlCwgaCgYKAZ4SARMSFQHGX2MiY5A0mwbwakEXmSEs7WfsJw0423';
const endpoint = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predict`;
    console.log("trying to talk to dog");
    let reqData = {
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
                        "content": "hi i want to write a paper"
                    },
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
    const updatedHistory = await getStorage('chatHistory');
    // chrome.storage.sync.get({ chatHistory: [] }, function (data) {
    //     updatedHistory = data.chatHistory;
    //     // reqData.instances[0].messages.append(updatedHistory);
    //     // reqData.instances[0]["messages"] = updatedHistory;
    for (let i = 0; i < updatedHistory.length; i++) {
        reqData.instances[0].messages.push(updatedHistory[i]);
    }
    console.log("history", updatedHistory);
    // });

    reqData.instances[0].messages = updatedHistory;
    console.log("reqData", reqData.instances[0].messages);

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Goog-User-Project': PROJECT_ID
        },
        body: JSON.stringify(reqData)
    })
    .then(response => {
        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON from the response
      })
    .then(data => {
        console.log("pred", data.predictions[0].candidates[0]);
        doggo = data.predictions[0].candidates[0].content
        addMessageToChatHistory(doggo, 'dog-response');
    })
    .catch(error => console.error('Error:', error));
    // alert("Response is " + reponse.json());
}




