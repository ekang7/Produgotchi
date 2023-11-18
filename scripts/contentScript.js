if(typeof init==="undefined"){
    const init = function() {
        
        // Create a new image element
        const spriteImage = document.createElement('img');
      
        // Set the source of the image to your sprite image file
        spriteImage.src = 'dog.png';
      
        // Set the position and size of the image
        spriteImage.style.position = 'absolute';
        spriteImage.style.left = '0';
        spriteImage.style.top = '0';
        spriteImage.style.width = '100px';
        spriteImage.style.height = '100px';
      
        // Make the image draggable
        spriteImage.draggable = true;
      
        // Append the image to the document body
        document.body.appendChild(spriteImage);
        
        const injectElement = document.createElement('div');
        injectElement.className = "rustyZone-element";
        injectElement.innerHTML = "Rusty Zone";
        document.body.appendChild(injectElement);

      }
    // Call the initialize function to inject the draggable sprite image
    init();
}
