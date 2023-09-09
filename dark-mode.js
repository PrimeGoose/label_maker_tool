document.addEventListener('DOMContentLoaded', async (event) => {

    let isDark = false;
    /**
    * Toggles between light and dark themes.
    */
    function toggleTheme() {
        const body = document.body;
        const colorPalette = document.querySelector('.color-palette');
        const topToolBar = document.querySelector('.top-tool-bar');
        const themeToggleButton = document.getElementById('theme-toggle-button');
        const icon = themeToggleButton.querySelector('.material-icons');
        if (body.style.backgroundColor === 'orangered') {
            isDark = true;
            setcookie('theme', 'dark', 365);
            // Switch to light mode
            body.style.backgroundColor = 'white';
            colorPalette.style.backgroundColor = 'white';
            topToolBar.style.backgroundColor = 'white';
            icon.textContent = 'brightness_4';  // Change icon to moon (dark mode icon)
        } else {
            isDark = false;
            setcookie('theme', 'light', 365);
            // Switch to dark mode
            body.style.backgroundColor = 'orangered';
            colorPalette.style.backgroundColor = '#2f4f4f3d';
            topToolBar.style.backgroundColor = '#000000';
            icon.textContent = 'brightness_7';  // Change icon to sun (light mode icon)
        }
    }

    // Add click event listener to the theme toggle button
    document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);

    // Set initial theme    
    let theme = getCookie('theme');
    if (theme === 'dark') {
        isDark = true;
        toggleTheme();
    } else if (theme === 'light') {
        isDark = false;
        toggleTheme();
    }







}); // DOMContentLoaded  end here 

function setcookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); //days * hours * minutes * seconds * milliseconds
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
    return null;
}