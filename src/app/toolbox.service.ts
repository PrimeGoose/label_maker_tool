// toolbox.service.ts

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Label } from './types';
@Injectable({
  providedIn: 'root',
})
export class ToolboxService {
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

  private labelsSubject = new BehaviorSubject<any[]>([...this.Labels]);

  labels$ = this.labelsSubject.asObservable();

  updateLabels(newLabel: Label[]) {
    // Retrieve current value
    const currentLabels: Label[] = this.labelsSubject.getValue();

    // Update the value
    currentLabels.push(...newLabel);

    // Publish the new value
  this.labelsSubject.next([...newLabel]);
  }
}
