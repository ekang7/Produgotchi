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

// Create a button
const button = document.createElement('button');
button.innerText = 'Ask';
button.className = 'button';

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

// Event listener for the button
button.addEventListener('click', function () {
    if (textBox.style.display == 'block') {
      textBox.style.display = 'none';
    } else {
      outputArea.innerText = '';
      blueBox.style.display = 'block';
      outputArea.style.display = 'block';
      textBox.style.display = 'block';
      textBox.value = '';
      textBox.focus();
    }
});

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

// Append the button and blue box to the injectElement
draggableElement.appendChild(dogSprite);
draggableElement.appendChild(button);
draggableElement.appendChild(blueBox);
// Create the image element
const imgElement = document.createElement('img');
imgElement.src = chrome.runtime.getURL('dog.png'); // Adjust the file name if necessary
imgElement.style.width = '100%'; // Make the image fit the wrapper div
imgElement.style.height = '100%'; // Make the image fit the wrapper div
draggableElement.appendChild(imgElement);

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

    if (e.target === draggableElement) {
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

document.addEventListener('touchstart', dragStart, false);
document.addEventListener('touchend', dragEnd, false);
document.addEventListener('touchmove', drag, false);

document.addEventListener('mousedown', dragStart, false);
document.addEventListener('mouseup', dragEnd, false);
document.addEventListener('mousemove', drag, false);
