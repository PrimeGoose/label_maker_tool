// border_toggle.js

/**
 * Sets up a border toggle function that allows the user to add or remove borders
 * from elements with the class 'label-container' based on button clicks.
 *
 * @function
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const borderButtons = document.querySelectorAll('.material-symbols-outlined');

    borderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonId = button.getAttribute('id');
            toggleBorder(buttonId);
        });
    });
});

/**
 * Toggles a specific border on elements based on their class and position within 'label-container'.
 *
 * @function
 * @param {string} buttonId - The ID of the button that was clicked.
 */
function toggleBorder(buttonId) {
    const labels = document.querySelectorAll('.label-container .label');

    labels.forEach(label => {
        switch (buttonId) {
            case 'border-h':
                label.classList.toggle('border-horizontal');
                break;
            case 'border-t':
                label.classList.toggle('border-top');
                break;
            case 'border-b':
                label.classList.toggle('border-bottom');
                break;
            case 'border-r':
                label.classList.toggle('border-right');
                break;
        }
    });
}
