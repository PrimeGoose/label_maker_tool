// label-container.component.ts
import { Component, Input } from '@angular/core';
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
  @Input() labelHeight = '20';
  @Input() digitFontSize = '15';
  @Input() locationFontSize = `21`;
  @Input() digitWidth = '50';
  @Input() locationWidth = '130';
  @Input() orientationClass = 'a4-landscape';
  @Input() yellowOpacityClass = 'bg-opacity-70';
  @Input() fontWeightClass: 'font-black' | '' = 'font-black';
  @Input() Labels: Label[] = [
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
