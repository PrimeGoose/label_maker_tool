// base_font_size.js

/**
 * Handles the loading event of the document and sets up event handlers
 * for the increase and decrease buttons to adjust the base font size.
 *
 * @function
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const fontDisplay = document.getElementById('font-display-px');
    
    if (!fontDisplay) {
        console.error('Font display element not found');
        return;
    }

    let baseFontSize = 70;

    document.documentElement.style.setProperty('--base-font-size', `${baseFontSize}px`);
    fontDisplay.textContent = `Font: ${baseFontSize}px`;

    const increaseButton = document.querySelector('.increaseFont');
    const decreaseButton = document.querySelector('.decreaseFont');

    if (!increaseButton || !decreaseButton) {
        console.error('Increase or decrease button not found');
        return;
    }

    /**
     * Handles the click event on the increase button to increase the base font size
     * and updates the display value.
     *
     * @function
     * @listens click
     */
    increaseButton.addEventListener('click', () => {
        console.log('increase');
        if (baseFontSize < 70) {
            baseFontSize += 1;
            document.documentElement.style.setProperty('--base-font-size', `${baseFontSize}px`);
            fontDisplay.textContent =  `Font: ${baseFontSize}px`;
        }
    });

    /**
     * Handles the click event on the decrease button to decrease the base font size
     * and updates the display value.
     *
     * @function
     * @listens click
     */
    decreaseButton.addEventListener('click', () => {
            console.log('decrease');
        if (baseFontSize > 60) {
            baseFontSize -= 1;
            document.documentElement.style.setProperty('--base-font-size', `${baseFontSize}px`);
            fontDisplay.textContent = `Font: ${baseFontSize}px`;
        }
    });

/**
 * Sets the document title to include the values from specific elements before printing.
 *
 * @function
 * @listens beforeprint
 */
window.addEventListener('beforeprint', () => {
    const fontDisplay = document.getElementById('font-display-px').textContent;
    const heightDisplay = document.getElementById('height-display').textContent;
    const opacityValue = document.getElementById('opacity-value').textContent;
    const selectedColor = document.querySelector('.selected-color').textContent;

    document.title = `${fontDisplay}, ${heightDisplay}, Opacity: ${opacityValue}%, Color: ${selectedColor}`;
});


});
