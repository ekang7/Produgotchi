// if (typeof init === "undefined") {
//   const init = function () {

//       // Create a new image element
//       const spriteImage = document.createElement('img');
//       spriteImage.src = 'dog.png';
//       spriteImage.style.position = 'absolute';
//       spriteImage.style.left = '0';
//       spriteImage.style.top = '0';
//       spriteImage.style.width = '100px';
//       spriteImage.style.height = '100px';
//       spriteImage.draggable = true;
//       document.body.appendChild(spriteImage);

//       // Create the Rusty Zone element
//       const injectElement = document.createElement('div');
//       injectElement.className = "rustyZone-element";
//       injectElement.innerHTML = "Rusty Zone";

//       // Create a button
//       const button = document.createElement('button');
//       button.innerText = 'Ask';
//       button.style.marginTop = '10px';

//       // Create a blue box container
//       const blueBox = document.createElement('div');
//       blueBox.style.border = '1px solid blue';
//       blueBox.style.backgroundColor = 'rgba(0, 0, 255, 0.2)';
//       blueBox.style.padding = '10px';
//       blueBox.style.marginTop = '40px';
//       blueBox.style.width = '320px';
//       blueBox.style.position = 'relative';
//       blueBox.style.display = 'none';

//       // Create a red square
//       const redSquare = document.createElement('div');
//       redSquare.style.width = '30px';
//       redSquare.style.height = '30px';
//       redSquare.style.backgroundColor = 'red';
//       redSquare.style.position = 'absolute';
//       redSquare.style.top = '0';
//       redSquare.style.right = '0';

//       // Create an output area
//       const outputArea = document.createElement('div');
//       outputArea.style.border = '1px solid black';
//       outputArea.style.width = '300px';
//       outputArea.style.margin = '5px 0';
//       outputArea.style.padding = '5px';
//       outputArea.style.minHeight = '50px';
//       outputArea.style.color = 'white';

//       // Create a text input
//       const textBox = document.createElement('input');
//       textBox.type = 'text';
//       textBox.style.display = 'none';
//       textBox.style.width = '300px';
//       textBox.style.height = '30px';
//       textBox.style.marginTop = '5px';

//       // Event listener for the button
//       button.addEventListener('click', function () {
//           if (textBox.style.display == 'block') {
//             textBox.style.display = 'none';
//           } else {
//             outputArea.innerText = '';
//             blueBox.style.display = 'block';
//             outputArea.style.display = 'block';
//             textBox.style.display = 'block';
//             textBox.value = '';
//             textBox.focus();
//           }
//       });

//       // Event listener for the text box
//       textBox.addEventListener('keypress', function (e) {
//           if (e.key === 'Enter') {
//               outputArea.innerText = textBox.value;
//               textBox.value = '';
//           }
//       });

//       // Event listener to clear the text box on click
//       textBox.addEventListener('click', function () {
//           textBox.value = '';
//       });

//       // Event listener for the red square (example logic)
//       redSquare.addEventListener('click', function () {
//         console.log('Red square clicked! Processing logic...');
//         blueBox.style.display = 'none';
//         textBox.style.display = 'none';
//         outputArea.style.display = 'none';
//       });

//       // Append the output area and text box to the blue box
//       blueBox.appendChild(outputArea);
//       blueBox.appendChild(textBox);
//       blueBox.appendChild(redSquare);

//       // Append the button and blue box to the injectElement
//       injectElement.appendChild(button);
//       injectElement.appendChild(blueBox);

//       // Append the injectElement to the document body
//       document.body.appendChild(injectElement);
//   }
//   init();
// }

//        // Wait for the DOM to be fully loaded
//        document.addEventListener('DOMContentLoaded', function() {
//         // Create the draggable element
//         const draggableElement = document.createElement('div');
//         draggableElement.id = 'myDraggable';
//         draggableElement.innerText = 'Drag me!';
//         document.body.appendChild(draggableElement);

//         // Inject jQuery
//         const scriptJQuery = document.createElement('script');
//         scriptJQuery.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
//         document.head.appendChild(scriptJQuery);

//         // Once jQuery is loaded, inject jQuery UI
//         scriptJQuery.onload = () => {
//             const scriptJQueryUI = document.createElement('script');
//             scriptJQueryUI.src = 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js';
//             document.head.appendChild(scriptJQueryUI);

//             scriptJQueryUI.onload = () => {
//                 // Once jQuery UI is loaded, make the element draggable
//                 $('#myDraggable').draggable();
//             };
//         };
//       });
