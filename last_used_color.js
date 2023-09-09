document.addEventListener('DOMContentLoaded', async (event) => {
    // Attaching event listener to the print button
    document.getElementById('print-btn').addEventListener('click', save_lastUsed_color);


    let last_used = getCookie('lastUsedColorHex')
    console.log('lastUsedColorHex', last_used);
    document.querySelector('.selected-color').innerHTML = last_used;

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

    // bg-yellow set all nodes to the last used color
    document.querySelectorAll('.bg-yellow').forEach(async (item) => {
        console.log(last_used.toLowerCase());
        const colorObj = colors.find(color => color.name.toLowerCase() === last_used.toLowerCase());
        if (colorObj) {
            item.style.setProperty('background-color', colorObj.hex, 'important');
        }
    });




}); // DOMContentLoaded  end here 






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
    return "Yellow";
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

/** 
 * Save the last used color to a cookie
 */
function save_lastUsed_color() {
    const current = document.querySelector('.selected-color').innerHTML
    console.log('selectedColorHex', current);
    setCookie('lastUsedColorHex', current, 30);
    console.log('lastUsedColorHex', current);
}



