// Create the draggable element
const draggableElement = document.createElement('div');
draggableElement.id = 'myDraggableImageWrapper';
draggableElement.innerText = 'Drag me!';

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
