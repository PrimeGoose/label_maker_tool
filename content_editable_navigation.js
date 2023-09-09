document.addEventListener('DOMContentLoaded', (event) => {

    document.addEventListener('keydown', (e) => {
        const editableElements = Array.from(document.querySelectorAll('[contenteditable="true"]'));
        const currentFocus = document.activeElement;

        if (editableElements.includes(currentFocus)) {
            let index = editableElements.indexOf(currentFocus);

            switch (e.key) {
                case 'ArrowUp':
                    index = index - 1 < 0 ? editableElements.length - 1 : index - 1;
                    break;
                case 'ArrowDown':
                    index = (index + 1) % editableElements.length;
                    break;
                default:
                    return; // Allow other keys to function normally
            }

            editableElements[index].focus();
        }
    });

});