// toolbox.service.ts

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolboxService {
  Labels = [
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

  private labelsSubject = new BehaviorSubject<any[]>([
    // Your initial Labels array
  ]);

  labels$ = this.labelsSubject.asObservable();

  updateLabels(newLabel: any) {
    // Retrieve current value
    const currentLabels = this.labelsSubject.getValue();

    // Update the value
    currentLabels.push(newLabel);

    // Publish the new value
    this.labelsSubject.next(currentLabels);
  }
}
