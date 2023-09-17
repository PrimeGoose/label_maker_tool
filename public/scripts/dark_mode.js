document.addEventListener('DOMContentLoaded', (event) => {
    let theme = getCookie('theme') || 'light';
    updateTheme(theme);

    document.getElementById('theme-toggle-button').addEventListener('click', () => {
        theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'orange' : 'light';
        toggleTheme(theme);
    });
});

function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return '';
}

/**
 * Toggles between light, dark, and orange themes.
 * 
 * @param {string} theme - The current theme setting.
 */
function toggleTheme(theme) {
    updateTheme(theme);
    setCookie('theme', theme, 365);
}

/**
 * Updates the theme based on the theme parameter.
 * 
 * @param {string} theme - The current theme setting.
 */
function updateTheme(theme) {
    const body = document.body;
    const colorPalette = document.querySelector('.color-palette');
    const topToolBar = document.querySelector('.top-tool-bar');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const icon = themeToggleButton.querySelector('.material-icons');
    const modalContent = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.close-btn');
    // .color-active

    if (theme === 'dark') {
        body.style.backgroundColor = '#181818';
        body.style.color = '#E0E0E0';
        colorPalette.style.backgroundColor = '#2f4f4f3d';
        topToolBar.style.backgroundColor = '#303030';
        icon.textContent = 'brightness_7';
        modalContent.style.backgroundColor = '#181818';
        modalContent.style.color = '#E0E0E0';
        closeBtn.style.color = '#BB86FC';
    } else if (theme === 'orange') {
        body.style.backgroundColor = 'darkorange';
        body.style.color = '#E0E0E0';
        colorPalette.style.backgroundColor = '#2f4f4f3d';
        topToolBar.style.backgroundColor = '#303030';
        icon.textContent = 'brightness_7';
        modalContent.style.backgroundColor = '#181818';
        modalContent.style.color = '#E0E0E0';
        closeBtn.style.color = '#BB86FC';
    } else {
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
        colorPalette.style.backgroundColor = 'white';
        topToolBar.style.backgroundColor = 'white';
        icon.textContent = 'brightness_4';
        modalContent.style.backgroundColor = 'white';
        modalContent.style.color = 'black';
        closeBtn.style.color = 'black';
    }
}
