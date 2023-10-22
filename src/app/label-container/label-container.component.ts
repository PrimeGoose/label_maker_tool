// label-container.component.ts
import { Component } from '@angular/core';
import { ToolboxService } from '../toolbox.service';
import { Subscription } from 'rxjs';
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

@Component({
  selector: 'app-label-container',
  templateUrl: './label-container.component.html',
  styleUrls: ['./label-container.component.scss'],
})
export class LabelContainerComponent {
  constructor(private toolboxService: ToolboxService) {}
   labelHeight = '20';
   digitFontSize = '15';
   locationFontSize = `21`;
   digitWidth = '50';
   locationWidth = '130';
   orientationClass = 'a4-landscape';
   yellowOpacityClass = 'bg-opacity-70';
   fontWeightClass: 'font-black' | '' = 'font-black';
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


}
