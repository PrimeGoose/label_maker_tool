import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { HowToUseComponent } from './how-to-use/how-to-use.component';

/**
 * Label interface defining the structure of labels.
 */
interface Label {
  level1: {
    digit: string;
    street: string;
    number: string;
    side: string;
    level: string;
  };
  level2: {
    digit: string;
    street: string;
    number: string;
    side: string;
    level: string;
  };
}

/**
 * AppComponent class defining the core logic.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './print.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  /**
   * @param {MatDialog} dialog - Material dialog service for opening dialogs.
   */
  constructor(public dialog: MatDialog) {}
  Labels: Label[] = [
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
  ];
  ngOnInit(): void {}
  // (labelsChanged)="updateLabels($event)" in label-container.component.html
  updateLabels(newLabels: Label[]) {
    console.log('newLabels', newLabels);
    this.Labels = newLabels;
  }
}
