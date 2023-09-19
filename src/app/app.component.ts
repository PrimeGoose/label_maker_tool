import { Component } from '@angular/core';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rack-label-tool';

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
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = new Uint8Array((e.target as any).result);
      let workbook = XLSX.read(data, { type: 'array' });

      let firstSheetName = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[firstSheetName];

      // Fetching all rows as an array of objects using the correct worksheet
      let sheetDataJson:any = XLSX.utils.sheet_to_json(worksheet);
      console.log(sheetDataJson[0].label)
      // Continue the function...

      // Extract the data from column "A" and format it
      let formattedData:any = sheetDataJson.map((row:any) => row.label.trim().split(' ').join(' ') );

      // Extract and group labels by their racking address and location number
      let groupedLabels:any = {};

      formattedData.forEach((label:any) => {
        let digit = label.slice(0, 3);  // Extract digit
        let rackAddress = label.slice(4, 6).toUpperCase();  // Extract racking address
        let locationNumber = label.slice(6, 8);  // Extract location number
        let side = label.slice(8, 9).toUpperCase(); // Extract side (A or B)
        let level = label.slice(-1);  // Extract level (1 or 2)

        let key = rackAddress + locationNumber;
        if (!groupedLabels[key]) {
          groupedLabels[key] = {};
        }

        if (level === '1') {
          groupedLabels[key].digit_L1 = digit;
          groupedLabels[key].location_L1 = `${rackAddress} ${locationNumber} ${side}${level}`;
        } else if (level === '2') {
          groupedLabels[key].digit_L2 = digit;
          groupedLabels[key].location_L2 = `${rackAddress} ${locationNumber} ${side}${level}`;
        }
      });

      // Convert the groupedLabels object to an array of objects
      let result = Object.values(groupedLabels);

      console.log(result);  // For debugging purposes
      return result;



    };
    reader.readAsArrayBuffer(file);
  }
}
