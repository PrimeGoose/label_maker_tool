document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('upload').addEventListener('change', handleFile);
});
let Labels = []
function handleFile(e) {
    Labels = []

    function extractColumn(data, columnKey) {
        return Object.keys(data)
            .filter(key => key.startsWith(columnKey))
            .map(key => data[key].v);
    }

    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        let data = new Uint8Array((e.target).result);
        let workbook = XLSX.read(data, { type: 'array' });
        let firstSheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[firstSheetName];

        const columnKey = 'A';
        const columnValues = extractColumn(worksheet, columnKey);
        // console.log(columnValues);
        let formattedData = columnValues.map((row) => {
            let label = row.trim().toUpperCase();
            let removeAllsybbols_and_spaces = label.replace(/[^a-zA-Z0-9]/g, "");
            return removeAllsybbols_and_spaces;
        });
        let temp_labels = [];
        formattedData.forEach((label) => {
            let level = label.slice(-1)
            if (level != 1 && level != 2) { return }
            if (label.length < 9) { return }
            if (level == 1) {
                let digit = label.slice(0, 3)// needs to be 3 characters
                if (digit.length != 3) {
                    console.log("digit is not 3 characters", digit, "in:", label)
                    return
                }
                let street = label.slice(3, 5)// Alphabetical characters only ,two characters
                if (street.length != 2) {
                    console.log("street is not 2 characters", street, "in:", label)
                    return
                }
                let number = label.slice(5, 7)// two digits
                if (number.length != 2) {
                    console.log("number is not 2 digits", number, "in:", label)
                    return
                }
                let side = label.slice(7, 8) // can only be A or B
                if (side !== "A" && side !== "B") {
                    console.log("l1 side is not A or B", side == 'A', "in:", label)
                    return
                }

                temp_labels.push({
                    level1: {
                        digit: digit,
                        street: street,
                        number: number,
                        side: side,
                        level: level
                    }
                })
            }
            if (level == 2) {
                let digit = label.slice(0, 3)// needs to be 3 characters
                if (digit.length != 3) {
                    console.log("digit is not 3 characters", digit, "in:", label)
                    return
                }
                let street = label.slice(3, 5)// Alphabetical characters only ,two characters
                if (street.length != 2) {
                    console.log("street is not 2 characters", street, "in:", label)
                    return
                }
                let number = label.slice(5, 7)// two digits
                if (number.length != 2) {
                    console.log("number is not 2 digits", number, "in:", label)
                    return
                }
                let side = label.slice(7, 8) // can only be A or B
                if (side.toUpperCase() !== "A" && side !== "B") {
                    console.log("side is not A or B", side, "in:", label)
                    return
                }
                temp_labels.push({
                    level2: {
                        digit: digit,
                        street: street,
                        number: number,
                        side: side,
                        level: level
                    }
                })
            }
        });// end of forEach

        temp_labels.forEach((label1) => {
            if (label1.level1) {
                let match = temp_labels.find((label2) => {
                    return label2.level2 &&
                        label1.level1.street === label2.level2.street &&
                        label1.level1.number === label2.level2.number &&
                        label1.level1.side === label2.level2.side;
                });

                if (match) {
                    Labels.push({
                        level1: label1.level1,
                        level2: match.level2
                    });
                }
            }
        });
        console.log("match", Labels)
        renderLabels(Labels);

    };
    reader.readAsArrayBuffer(file);
    e.target.value = '';
    return Labels

}

// filename: renderLabels.js

/**
 * Renders labels using the provided data array
 * @param {Array} data - Array of objects containing label data
 */
function renderLabels(data) {
    const container = document.getElementById('render-here');

    if (!container) {
        console.error('Container not found');
        return;
    }

    container.innerHTML = '';

    data.forEach(item => {
        const labelPair = document.createElement('div');
        labelPair.classList.add('label-pair');

        ['level2', 'level1'].forEach(level => {
            const label = document.createElement('div');
            label.classList.add('label');

            const labelDigit = document.createElement('div');
            labelDigit.classList.add('label-digit', 'bg-black', level === 'level2' ? 'border-bottom-white' : 'border-top-white');
            const digitText = document.createElement('div');
            digitText.classList.add('digit-text');
            digitText.setAttribute('contenteditable', 'true');
            digitText.setAttribute('spellcheck', 'false');
            digitText.textContent = item[level].digit;

            labelDigit.appendChild(digitText);
            label.appendChild(labelDigit);

            const location = document.createElement('div');
            location.classList.add('location', level === 'level2' ? 'bg-yellow' : 'bg-white', 'border-bottom-black');
            const locationText = document.createElement('div');
            locationText.classList.add('location-text');
            locationText.setAttribute('contenteditable', 'true');
            locationText.setAttribute('spellcheck', 'false');
            locationText.style.cssText = 'display: flex; justify-content: space-between; padding-left: 1rem; padding-right: 1rem;';

            const address = document.createElement('span');
            address.classList.add('address');
            address.textContent = item[level].street;
            const number = document.createElement('span');
            number.classList.add('number');
            number.textContent = item[level].number;
            const sideLevel = document.createElement('span');
            sideLevel.classList.add('side-level');
            sideLevel.textContent = item[level].side + item[level].level;

            locationText.appendChild(address);
            locationText.appendChild(number);
            locationText.appendChild(sideLevel);
            location.appendChild(locationText);
            label.appendChild(location);

            labelPair.appendChild(label);
        });

        container.appendChild(labelPair);
    });
}




function Content_Editable_Arrow_Up_Down() {
    document.addEventListener('keydown', (e) => {
        const editableElements = Array.from(document.querySelectorAll(`[contenteditable='true']`));
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
}