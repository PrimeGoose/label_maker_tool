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

  ngOnInit(): void {

  }
 
}
