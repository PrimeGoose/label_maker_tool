
document.addEventListener('DOMContentLoaded', (event) => {
    initializeColorPalette();
}); // DOMContentLoaded  end here 

/**
 * Colors data
 * @type {Array<{name: string, hex: string, rgb: string}>}
 */
const colors = [
    { name: "Yellow", hex: "#FFFF00", rgb: "rgb(255, 255, 0)" },
    { name: "Amber", hex: "#FFBF00", rgb: "rgb(255, 191, 0)" },
    { name: "Bright Yellow", hex: "#FFEA00", rgb: "rgb(255, 234, 0)" },
    { name: "Cadmium Yellow", hex: "#FDDA0D", rgb: "rgb(253, 218, 13)" },
    { name: "Chartreuse", hex: "#DFFF00", rgb: "rgb(223, 255, 0)" },
    { name: "Citrine", hex: "#E4D00A", rgb: "rgb(228, 208, 10)" },
    { name: "Gold", hex: "#FFD700", rgb: "rgb(255, 215, 0)" },
    { name: "Golden Yellow", hex: "#FFC000", rgb: "rgb(255, 192, 0)" },
    { name: "Icterine", hex: "#FCF55F", rgb: "rgb(252, 245, 95)" },
    { name: "Jasmine", hex: "#F8DE7E", rgb: "rgb(248, 222, 126)" },
    { name: "Lemon Yellow", hex: "#FAFA33", rgb: "rgb(250, 250, 51)" },
    { name: "Maize", hex: "#FBEC5D", rgb: "rgb(251, 236, 93)" },
    { name: "Mustard Yellow", hex: "#FFDB58", rgb: "rgb(255, 219, 88)" },
    { name: "Naples Yellow", hex: "#FADA5E", rgb: "rgb(250, 218, 94)" },
    { name: "Saffron", hex: "#F4C430", rgb: "rgb(244, 196, 48)" },
];

/**
 * Initialize the color palette by creating color items and assigning event handlers to them
 */
function initializeColorPalette() {
    const colorPalette = document.querySelector('.color-palette');
    colorPalette.innerHTML = '';

    document.querySelector('.selected-color').innerHTML = 'Yellow'
    let last_used = getCookie('lastUsedColorHex')


    colors.forEach(color => {
        const colorItem = document.createElement('div');
        colorItem.classList.add('color-item');


        const isFavorite = getCookie(color.hex) === 'favorite';

        colorItem.innerHTML = `
            <span class="material-icons favorite-icon ${isFavorite ? 'favorite' : ''}" style="color: ${isFavorite ? 'gold' : 'lightgray'};" data-hex="${color.hex}">star</span>
            <div class="color-preview" style="background-color: ${color.hex};" data-hex="${color.hex}" data-rgb="${color.rgb}" data-name="${color.name}"></div>
        `;

        colorItem.querySelector('.favorite-icon').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering color select when clicking the star
            toggleFavoriteColor(color);
        });

        colorItem.addEventListener('click', () => {

            selectColor(color)


        });

        colorPalette.appendChild(colorItem);


        document.querySelectorAll('.color-item').forEach((item) => {
            let item_data_name = item.querySelector('.color-preview').getAttribute('data-name');
            if (last_used == item_data_name) {

                item.classList.add('color-active')
            }
        }
        );



    });

    // lat used
    // Retrieve the last used color and display a red border around it
    const lastUsedColorHex = rgbToHex(getCookie('lastUsedColorHex'));
    if (lastUsedColorHex) {
        const lastUsedColorItem = document.querySelector(`.color-item [data-hex="${lastUsedColorHex}"]`);
        if (lastUsedColorItem) {
            lastUsedColorItem.parentNode.classList.add('color-active');  // Adding red border
            document.querySelector('.bg-yellow').style.backgroundColor = lastUsedColorHex;  // Setting it as the current color
        }
    }
}


/** 
 * Get a cookie
 * @param {string} name - The cookie name
 * @returns {string} - The cookie value
 */
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


/** 
 * Convert rgb color to hex
 * @param {string} rgb - The rgb color string
 * @returns {string} - The hex color string
 */
function rgbToHex(rgb) {
    if (!rgb) return null;
    const rgbValues = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    const hex = rgbValues ? `#${(+rgbValues[1]).toString(16).padStart(2, '0')}${(+rgbValues[2]).toString(16).padStart(2, '0')}${(+rgbValues[3]).toString(16).padStart(2, '0')}` : null;
    return hex;
}


/** 
 * Select a color
 * @param {Object} color - The color object
 */
function selectColor(color) {
    document.querySelectorAll('.color-item').forEach(item => item.classList.remove('color-active'));
    document.querySelector('.bg-yellow').style.backgroundColor = color.hex;
    document.querySelector(`.color-item [data-hex="${color.hex}"]`).parentNode.classList.add('color-active');
    document.querySelector('.selected-color').innerHTML = color.name;





    // Set the background color of all elements with class bg-yellow to the selected color's hex value
    document.querySelectorAll('.bg-yellow').forEach(item => {
        const colorObj = colors.find(colorItem => colorItem.name.toLowerCase() === color.name.toLowerCase());
        if (colorObj) {
            item.style.setProperty('background-color', colorObj.hex, 'important');
        }
    });
}


/**
 * Toggle a color as favorite
 * @param {Object} color - The color object
 */
function toggleFavoriteColor(color) {
    const icon = document.querySelector(`.favorite-icon[data-hex="${color.hex}"]`);

    if (icon.classList.contains('favorite')) {
        icon.classList.remove('favorite');
        icon.style.color = 'lightgray';
        setCookie(color.hex, '', -1); // Remove from favorites
    } else {
        icon.classList.add('favorite');
        icon.style.color = 'gold';
        setCookie(color.hex, 'favorite', 30); // Add to favorites for 30 days
    }
}


/** 
 * Set a cookie
 * @param {string} name - The cookie name
 * @param {string} value - The cookie value
 * @param {number} days - The number of days the cookie should last
 */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}