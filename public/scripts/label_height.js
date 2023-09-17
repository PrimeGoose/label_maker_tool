/**
 * Function to update the height display span
 */
function updateHeightDisplay(height) {
    try {
        const heightDisplay = document.getElementById('height-display');
        if (heightDisplay) {
            heightDisplay.textContent = `${height}mm`;
        } else {
            console.error('Height display element not found in the document.');
        }
    } catch (error) {
        console.error('An error occurred while updating the height display:', error);
    }
}

/**
 * Function to increase the digit height
 */
function increaseHeight() {
    try {
        let height = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--digit-height'));
        if (height < 30) {
            height += 1;
            document.documentElement.style.setProperty('--digit-height', `${height}mm`);
            updateHeightDisplay(height*2);
        }
    } catch (error) {
        console.error('An error occurred while increasing the height:', error);
    }
}

/**
 * Function to decrease the digit height
 */
function decreaseHeight() {
    try {
        let height = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--digit-height'));
        if (height > 22) {
            height -= 1;
            document.documentElement.style.setProperty('--digit-height', `${height}mm`);
            updateHeightDisplay(height*2);
        }
    } catch (error) {
        console.error('An error occurred while decreasing the height:', error);
    }
}

/**
 * Function to get and display the current height value from the CSS variable
 */
function setCurrentHeightDisplay() {
    try {
        let height = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--digit-height'));
        updateHeightDisplay(height*2);
    } catch (error) {
        console.error('An error occurred while setting the current height display:', error);
    }
}

/**
 * Set up event listeners for the buttons to adjust the digit height
 */
function setUpEventListeners() {
    try {
        const increaseButton = document.getElementById('increaseHeight');
        const decreaseButton = document.getElementById('decreaseHeight');

        if (increaseButton && decreaseButton) {
            increaseButton.addEventListener('click', increaseHeight);
            decreaseButton.addEventListener('click', decreaseHeight);
            setCurrentHeightDisplay();  // Set the initial height display when the window loads
        } else {
            console.error('Buttons not found in the document.');
        }
    } catch (error) {
        console.error('An error occurred while setting up the event listeners:', error);
    }
}

// Initialize the event listeners on window load
window.addEventListener('load', setUpEventListeners);

// ... (rest of your code, including the updateHeightDisplay, increaseHeight, and decreaseHeight functions)

