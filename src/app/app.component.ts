import { Component, ViewEncapsulation, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './print.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
