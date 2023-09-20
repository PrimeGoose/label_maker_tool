import { Component } from '@angular/core';
import * as XLSX from "xlsx";

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
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rack-label-tool';
  Labels: Label[] = [];

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

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = new Uint8Array((e.target as any).result);
      let workbook = XLSX.read(data, { type: 'array' });
      let firstSheetName = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[firstSheetName];

      const columnKey = 'A';
      // Getting the column values
      const columnValues = extractColumn(worksheet, columnKey);
      console.log(columnValues);
      // Extract the data from column "A" and format it
      let formattedData: any = columnValues.map((row: any) => {
        let label = row.trim().toUpperCase();
        let removeAllsybbols_and_spaces = label.replace(/[^a-zA-Z0-9]/g, "");
        return removeAllsybbols_and_spaces;
      });
      // Extract and group labels by their racking address and number number
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
