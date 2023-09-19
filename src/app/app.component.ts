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



    };
    reader.readAsArrayBuffer(file);
  }
}
