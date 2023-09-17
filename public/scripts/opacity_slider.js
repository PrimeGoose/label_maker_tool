document.addEventListener('DOMContentLoaded', async (event) => {

    const opacitySlider = document.getElementById('opacity-slider');
    const opacityValueLabel = document.getElementById('opacity-value');

    /**
     * Sets the alpha value of the background color of all .bg-yellow elements according to the slider value
     */
    function setBgAlpha() {
        const alphaValue = opacitySlider.value / 100;
        opacityValueLabel.textContent = opacitySlider.value; // Update the label to show the current value

        document.querySelectorAll('.bg-yellow').forEach(element => {
            const bgColor = getComputedStyle(element).backgroundColor;
            const [r, g, b] = bgColor.match(/\d+/g);
            element.style.backgroundColor = `rgba(${r},${g},${b},${alphaValue})`;
        });
    }

    // Set initial alpha value
    setBgAlpha();

    // Add event listener to the slider
    opacitySlider.addEventListener('input', setBgAlpha);
}); // DOMContentLoaded end here 
