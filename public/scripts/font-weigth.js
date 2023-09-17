document.addEventListener('DOMContentLoaded', () => {
    /**
     * Function to update the font display label
     */
    function updateFontDisplay(font) {
        try {
            const fontDisplay = document.getElementById('font-display');
            if (fontDisplay) {
                fontDisplay.textContent = font;
            } else {
                console.error('Font display element not found in the document.');
            }
        } catch (error) {
            console.error('An error occurred while updating the font display:', error);
        }
    }

    /**
     * Function to toggle the font weight
     */
    function toggleFontWeight() {
        try {
            let currentFont = getComputedStyle(document.documentElement).getPropertyValue('--location-font-family').trim();
            if (currentFont === "'Inconsolata Bold'") {
                document.documentElement.style.setProperty('--location-font-family', "'Inconsolata Black'");
                updateFontDisplay('Black');
            } else {
                document.documentElement.style.setProperty('--location-font-family', "'Inconsolata Bold'");
                updateFontDisplay('Bold');
            }
        } catch (error) {
            console.error('An error occurred while toggling the font weight:', error);
        }
    }

    /**
     * Set up event listener for the font weight toggle switch
     */
    function setUpFontToggleListener() {
        try {
            const fontToggle = document.getElementById('font-toggle');

            if (fontToggle) {
                fontToggle.addEventListener('change', toggleFontWeight);
            } else {
                console.error('Font toggle switch not found in the document.');
            }
        } catch (error) {
            console.error('An error occurred while setting up the font toggle listener:', error);
        }
    }

    // Initialize the setup on DOM content loaded
    setUpFontToggleListener();
});
