// toolbox.component.ts

import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HowToUseComponent } from '../how-to-use/how-to-use.component';
import * as XLSX from 'xlsx';
import { ToolboxService } from '../toolbox.service';
import { Label } from '../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
})
export class ToolboxComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private toolboxService: ToolboxService
  ) {}

  ngOnInit(): void {
    this.setLandscape3();
    this.detectOS();
  }
  ngOnDestroy(): void {}

  osPrintTooltip = "Print using your operating system's print dialog";
  message = '';
  matTooltip7 =
    'Using minimal margins, this setting yields 7 180x40mm labels per A4 page';
  matTooltip6 =
    'Using minimal margins, this setting yields 6 192x46.5mm labels per A4 page';
  matTooltip5 =
    'Using minimal margins, this setting yields 5 200x56mm labels per A4 page';
  matTooltip3 =
    'Using minimal margins, this setting yields 3 252x56mm labels per A4 page in Landscape mode';

  orientation: 'portrait' | 'landscape' = 'portrait';

  private Labels: Label[] = [];

  public openDialog() {
    this.dialog.open(HowToUseComponent);
  }

  private labelHeight: string = '20';
  private digitFontSize: string = '15';
  private locationFontSize: string = `21`;
  private digitWidth = '50';
  private locationWidth = '130';
  private labelPairWidthClass: string = 'a3-width';
  private orientationClass: string = 'a4-landscape';

  public setFive() {
    this.labelHeight = `${20 * 1.4}`;
    this.locationFontSize = `${26 * 1.121875}`;
    this.digitFontSize = `${15 * 1.121875}`;
    this.orientation = 'portrait';
    this.digitWidth = `56`;
    this.locationWidth = `144`;
    this.message = this.matTooltip7;
    this.labelPairWidthClass = 'a5-width';
    this.orientationClass = 'a4-portrait';
  }

  public setSix() {
    this.labelHeight = `${20 * 1.1625}`;
    this.locationFontSize = `${23 * 1.08125}`;
    this.digitFontSize = `${15 * 1.08125}`;
    this.digitWidth = '54';
    this.locationWidth = '138';
    this.orientation = 'portrait';
    this.message = this.matTooltip6;
    this.labelPairWidthClass = 'a6-width';
    this.orientationClass = 'a4-portrait';
  }

  public setSeven() {
    this.labelHeight = '20';
    this.locationFontSize = '21';
    this.digitFontSize = '15';
    this.orientation = 'portrait';
    this.digitWidth = '50';
    this.locationWidth = '130';
    this.message = this.matTooltip5;
    this.labelPairWidthClass = 'a7-width';
    this.orientationClass = 'a4-portrait';
  }

  public setLandscape3() {
    this.labelHeight = 20 * 1.4 + '';
    this.locationFontSize = 21 * 1.4 + '';
    this.digitFontSize = 15 * 1.4 + '';
    this.orientation = 'landscape';
    this.digitWidth = 50 * 1.4 + '';
    this.locationWidth = 130 * 1.4 + '';
    this.message = this.matTooltip3;
    this.labelPairWidthClass = 'a3-width';
    this.orientationClass = 'a4-landscape';
  }

  private yellowSlider: number = 70; // Default opacity set to 1 (100%)
  private yellowOpacityClass: string = 'bg-opacity-70';

  public return_bg_opacity_yellowSlider(opacity: any) {
    this.yellowSlider = opacity;
    this.yellowOpacityClass = `bg-opacity-${this.yellowSlider}`;
  }

  public printLabels(): void {
    window.print();
  }

  public useExcelFile(event: any): void {
    this.toolboxService.updateLabels([
      {
        level1: {
          digit: '5L4',
          street: 'en',
          number: '61',
          side: 'b',
          level: '1',
        },
        level2: {
          digit: '5UQ',
          street: 'en',
          number: '61',
          side: 'b',
          level: '2',
        },
      },
    ]);

    function extractColumn(data: any, columnKey: any) {
      return Object.keys(data)
        .filter((key) => key.startsWith(columnKey))
        .map((key) => data[key].v);
    }
    this.Labels = [];
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
        let removeAllsybbols_and_spaces = label.replace(/[^a-zA-Z0-9]/g, '');
        return removeAllsybbols_and_spaces;
      });
      let temp_labels: any = [];
      formattedData.forEach((label: any) => {
        let level = label.slice(-1);
        if (level != 1 && level != 2) {
          return;
        }
        if (label.length < 9) {
          return;
        }
        if (level == 1) {
          let digit = label.slice(0, 3); // needs to be 3 characters
          if (digit.length != 3) {
            console.log('digit is not 3 characters', digit, 'in:', label);
            return;
          }
          let street = label.slice(3, 5); // Alphabetical characters only ,two characters
          if (street.length != 2) {
            console.log('street is not 2 characters', street, 'in:', label);
            return;
          }
          let number = label.slice(5, 7); // two digits
          if (number.length != 2) {
            console.log('number is not 2 digits', number, 'in:', label);
            return;
          }
          let side = label.slice(7, 8); // can only be A or B
          if (side !== 'A' && side !== 'B') {
            console.log('l1 side is not A or B', side == 'A', 'in:', label);
            return;
          }

          temp_labels.push({
            level1: {
              digit: digit,
              street: street,
              number: number,
              side: side,
              level: level,
            },
          });
        }
        if (level == 2) {
          let digit = label.slice(0, 3); // needs to be 3 characters
          if (digit.length != 3) {
            console.log('digit is not 3 characters', digit, 'in:', label);
            return;
          }
          let street = label.slice(3, 5); // Alphabetical characters only ,two characters
          if (street.length != 2) {
            console.log('street is not 2 characters', street, 'in:', label);
            return;
          }
          let number = label.slice(5, 7); // two digits
          if (number.length != 2) {
            console.log('number is not 2 digits', number, 'in:', label);
            return;
          }
          let side = label.slice(7, 8); // can only be A or B
          if (side.toUpperCase() !== 'A' && side !== 'B') {
            console.log('side is not A or B', side, 'in:', label);
            return;
          }
          temp_labels.push({
            level2: {
              digit: digit,
              street: street,
              number: number,
              side: side,
              level: level,
            },
          });
        }
      }); // end of forEach

      // remove the default label from the array
      this.Labels = [];

      temp_labels.forEach((label1: any) => {
        if (label1.level1) {
          let match = temp_labels.find((label2: any) => {
            return (
              label2.level2 &&
              label1.level1.street === label2.level2.street &&
              label1.level1.number === label2.level2.number &&
              label1.level1.side === label2.level2.side
            );
          });

          if (match) {
            this.Labels.push({
              level1: label1.level1,
              level2: match.level2,
            });
          }
        }
      });
      this.toolboxService.updateLabels(this.Labels);
    };
    if (file) {
      reader.readAsArrayBuffer(file);
    }
  }

  fontWeightClass: 'font-black' | '' = 'font-black';
  toggleBold() {
    this.fontWeightClass =
      this.fontWeightClass === 'font-black' ? '' : 'font-black';
  }

  detectOS(): string {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    let os = 'Unknown';
    // mac: ⌥+⌘+P ,windows:Ctrl+shift+P this prints using the systems dialog

    if (/Mac/.test(platform)) {
      os = 'MacOS';
      this.osPrintTooltip = 'Print using ⌥+⌘+P';
    } else if (/Win/.test(platform)) {
      os = 'Windows';
      this.osPrintTooltip = 'Print using Ctrl+shift+P';
    } else if (/Linux/.test(platform)) {
      os = 'Linux';
      this.osPrintTooltip = 'Print using Ctrl+shift+P';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
      this.osPrintTooltip = '';
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
      os = 'iOS';
      this.osPrintTooltip = '';
    }

    return os;
  }
}
