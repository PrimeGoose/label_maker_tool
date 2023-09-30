import { Component } from '@angular/core';
import * as XLSX from "xlsx";
import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HowToUseComponent } from './how-to-use/how-to-use.component';
interface Label {
  level1: {
    digit: string,
    street: string,
    number: string,
    side: string,
    level: string
  },
  level2: {
    digit: string,
    street: string,
    number: string,
    side: string,
    level: string
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public dialog: MatDialog, private el: ElementRef, private cdRef: ChangeDetectorRef) { }
  title = 'rack-label-tool';
  labelHeight: string = '40';
  Labels: Label[] = [{
    level1: {
      digit: "01O",
      street: "kB",
      number: "30",
      side: "A",
      level: "1"
    },
    level2: {
      digit: "qie",
      street: "kB",
      number: "30",
      side: "A",
      level: "2"
    },
  }];
  openDialog() {
    this.dialog.open(HowToUseComponent);
  }
  updateSelectedClass() {
    this.selectedClass = `bg-${this.selectedColor}`;
  }
  setFive() {
this.labelHeight= '28'
  }
  setSix() {
    this.labelHeight='23.25'
  }
  setSeven() {
    this.labelHeight="20"
  }

  heightValue: number = 22; // New property to store height value
  opacityValue: number = 100; // New property to store opacity value

  handleHeightChange(value: number) {
    this.heightValue = value;
  }

  handleOpacityChange(value: number) {
    this.opacityValue = value;
  }
  /**
 * @property {string} selectedColor - The value of the selected color option
 */
  selectedColor: string = "yellow-300"
  /**
  * @property {string} selectedClass - The full class string based on selectedColor
  */
  selectedClass: string = 'bg-yellow-300';
  /**
  * This method updates the selectedClass whenever selectedColor changes.
  */
  /**
 * @property {number} sliderOpacity - The value for the background opacity
 */
  sliderOpacity: number = 100; // Default opacity set to 1 (100%)
  opacityClass: string = 'bg-opacity-100';
  return_bg_opacity_sliderOpacity(opacity: any) {
    // console.log("return_bg_opacity_sliderOpacity", opacity.value)
    this.sliderOpacity = opacity
    this.opacityClass = `bg-opacity-${this.sliderOpacity}`
  }
  /**
   * @property {Array} colors - The array of color options available for selection
   */
  colors = [
    { name: 'Yellow 50', value: 'yellow-50', class: 'bg-yellow-50 text-xl m-0 p-0 font-bold relative' },
    { name: 'Yellow 100', value: 'yellow-100', class: 'bg-yellow-100 text-xl m-0 p-0 font-bold relative' },
    { name: 'Yellow 200', value: 'yellow-200', class: 'bg-yellow-200 text-xl m-0 p-0 font-bold relative' },
    { name: 'Yellow 300', value: 'yellow-300', class: 'bg-yellow-300 text-xl m-0 p-0 font-bold relative' },
    { name: 'Yellow 400', value: 'yellow-400', class: 'bg-yellow-400 text-xl m-0 p-0 font-bold relative' },
    { name: 'Yellow 500', value: 'yellow-500', class: 'bg-yellow-500 text-xl m-0 p-0 font-bold relative' },
    // { name: 'Yellow 600', value: 'yellow-600', class: 'bg-yellow-600 text-xl m-0 p-0 font-bold relative' },
    // { name: 'Yellow 700', value: 'yellow-700', class: 'bg-yellow-700 text-xl m-0 p-0 font-bold relative' },
    // { name: 'Yellow 800', value: 'yellow-800', class: 'bg-yellow-800 text-xl m-0 p-0 font-bold relative' },
    // { name: 'Yellow 900', value: 'yellow-900', class: 'bg-yellow-900 text-xl m-0 p-0 font-bold relative' },


  ];

  /**
   * Handler to trigger the print dialog and print the labels present on the page.
   */
  printLabels(): void {
    window.print();
  }
  /**
   * Reads column "A" from the first sheet of the uploaded Excel file and logs the values.
   * @param {Event} event - The event containing the uploaded file.
   */
  useExcelFile(event: any): void {
    function extractColumn(data: any, columnKey: any) {
      return Object.keys(data)
        .filter(key => key.startsWith(columnKey))
        .map(key => data[key].v);
    }
    this.Labels = []
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = new Uint8Array((e.target as any).result);
      let workbook = XLSX.read(data, { type: 'array' });
      let firstSheetName = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[firstSheetName];

      const columnKey = 'A';
      const columnValues = extractColumn(worksheet, columnKey);
      console.log(columnValues);
      let formattedData: any = columnValues.map((row: any) => {
        let label = row.trim().toUpperCase();
        let removeAllsybbols_and_spaces = label.replace(/[^a-zA-Z0-9]/g, "");
        return removeAllsybbols_and_spaces;
      });
      let temp_labels: any = [];
      formattedData.forEach((label: any) => {
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

      temp_labels.forEach((label1: any) => {
        if (label1.level1) {
          let match = temp_labels.find((label2: any) => {
            return label2.level2 &&
              label1.level1.street === label2.level2.street &&
              label1.level1.number === label2.level2.number &&
              label1.level1.side === label2.level2.side;
          });

          if (match) {
            this.Labels.push({
              level1: label1.level1,
              level2: match.level2
            });
          }
        }
      });

    };
    reader.readAsArrayBuffer(file);
  }
}
