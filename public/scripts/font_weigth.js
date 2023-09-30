// File: toggle-font-weight.js

document.addEventListener('DOMContentLoaded', () => {

    // Set up event listener for the font weight toggle switch
    document.getElementById('font-toggle').addEventListener('click', () => {
        const button = document.getElementById('font-toggle');

        if (button.classList.contains('not-pressed')) {
            button.classList.remove('not-pressed');
            button.classList.add('pressed');
            updateFontDisplay('900');
            toggleFontWeight(900);
        } else {
            button.classList.remove('pressed');
            button.classList.add('not-pressed');
            updateFontDisplay('100');
            toggleFontWeight(100);
        }
    });

    /**
     * Update the font display label based on the font weight
     * @param {string} fontWeight - The new font weight value
     */
    function updateFontDisplay(fontWeight) {
        try {
            const fontDisplay = document.getElementById('font-display');
            if (fontDisplay) {
                fontDisplay.textContent = fontWeight;
            } else {
                console.error('Font display element not found in the document.');
            }
        } catch (error) {
            console.error('An error occurred while updating the font display:', error);
        }
    }

    /**
     * Toggle the font weight by updating the CSS variable
     * @param {number} fontWeight - The new font weight value
     */
    function toggleFontWeight(fontWeight) {
        try {
            document.documentElement.style.setProperty('--location-font-weight', fontWeight);
        } catch (error) {
            console.error('An error occurred while toggling the font weight:', error);
        }
    }
});
