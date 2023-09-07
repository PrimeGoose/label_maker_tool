







document.addEventListener('DOMContentLoaded', (event) => {
    const labels = document.querySelectorAll('.location-text, .digit-text');

    labels.forEach(label => {
        label.addEventListener('input', () => {

        });
    });


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



// Your script here
document.getElementById('upload').addEventListener('change', handleFile);

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
}

document.getElementById('upload').addEventListener('change', handleFile);

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



}
});