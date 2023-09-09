document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('upload').addEventListener('change', handleFile);
});

function handleFile(e) {
    let files = e.target.files, f = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: 'array' });
        let firstSheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[firstSheetName];
        let sheetData = XLSX.utils.sheet_to_json(worksheet);
        updateLabels(sheetData);
    };

    reader.readAsArrayBuffer(f);
    // Clear the input file value after reading the file
    e.target.value = '';
}

function updateLabels(data) {
    console.log(data);
    let groupedData = {};
    const mainContainer = document.querySelector('#render-here');
    mainContainer.innerHTML = ''; // Clear existing labels
    // Group data by prefix
    data.forEach(row => {
        const [labelDigitText, ...locationParts] = row['label'].split(' ');
        const locationText = locationParts.join(' ');
        const prefix = locationText.slice(0, -1);

        if (!groupedData[prefix]) {
            groupedData[prefix] = {};
        }

        if (locationText.endsWith('2')) {
            groupedData[prefix].top = { labelDigitText, locationText };
        } else if (locationText.endsWith('1')) {
            groupedData[prefix].bottom = { labelDigitText, locationText };
        }
    });

    // Create labels from grouped data
    Object.values(groupedData).forEach(group => {
        const labelContainer = document.createElement('div');
        labelContainer.className = 'label-container';

        // Create top label part
        const labelTop = document.createElement('div');
        labelTop.className = 'label';

        const labelDigitTop = document.createElement('div');
        labelDigitTop.className = 'label-digit bg-black border-bottom-white';

        const locationTop = document.createElement('div');
        locationTop.className = 'location bg-yellow border-bottom-black';

        if (group.top) {
            labelDigitTop.innerHTML = `<div class="digit-text">${group.top.labelDigitText}</div>`;
            locationTop.innerHTML = `<div class="location-text">${group.top.locationText}</div>`;
        }

        labelTop.appendChild(labelDigitTop);
        labelTop.appendChild(locationTop);

        // Create bottom label part
        const labelBottom = document.createElement('div');
        labelBottom.className = 'label';

        const labelDigitBottom = document.createElement('div');
        labelDigitBottom.className = 'label-digit bg-black border-top-white';

        const locationBottom = document.createElement('div');
        locationBottom.className = 'location bg-white border-top-black';

        if (group.bottom) {
            labelDigitBottom.innerHTML = `<div class="digit-text">${group.bottom.labelDigitText}</div>`;
            locationBottom.innerHTML = `<div class="location-text">${group.bottom.locationText}</div>`;
        }

        labelBottom.appendChild(labelDigitBottom);
        labelBottom.appendChild(locationBottom);

        // Append both labels to the label container
        labelContainer.appendChild(labelTop);
        labelContainer.appendChild(labelBottom);

        // Append the label container to the main container
        mainContainer.appendChild(labelContainer);
        mainContainer.appendChild(document.createElement('br'));
    });


    let last_used = getCookie('lastUsedColorHex')
    console.log('lastUsedColorHex', last_used);

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
    document.querySelectorAll('.color-item').forEach(item => item.classList.remove('color-active'));
    document.querySelectorAll('.color-preview').forEach((item, index) => {
        console.log(item.dataset.name, "?????");
        if (item.dataset.name.toLowerCase() === last_used.toLowerCase()) {
            document.querySelectorAll('.color-item')[index].classList.add('color-active');
        }
    });

    document.querySelectorAll('.bg-yellow').forEach(async (item) => {
        // set all bg colors to last used
        const colorObj = colors.find(color => color.name.toLowerCase() === last_used.toLowerCase());
        if (colorObj) {
            item.style.setProperty('background-color', colorObj.hex, 'important');
        }
    });




    // set selected color to last used
    document.querySelector('.selected-color').innerHTML = last_used;
}