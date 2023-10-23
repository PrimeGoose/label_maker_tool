// toolbox.service.ts

import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Label } from './types';
@Injectable({
  providedIn: 'root',
})
export class ToolboxService {
  private yellowOpacityClass: string = 'bg-opacity-70';
  // Initialize settings
  private initialSettings = {
    labelHeight: '20',
    digitFontSize: '15',
    locationFontSize: '21',
    digitWidth: '50',
    locationWidth: '130',
  };
  // labels array
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

  private yellowOpacitySubject = new BehaviorSubject<string>(
    this.yellowOpacityClass
  );

  private labelsSubject: BehaviorSubject<Label[]> = new BehaviorSubject<any[]>([
    ...this.Labels,
  ]);
  private settingsSubject: BehaviorSubject<any> = new BehaviorSubject<any>({
    ...this.initialSettings,
  });

  labels$: Observable<Label[]> = this.labelsSubject.asObservable();
  settings$: Observable<any> = this.settingsSubject.asObservable();
  yellowOpacity$ = this.yellowOpacitySubject.asObservable();

  updateLabels(newLabel: Label[]) {
    // Retrieve current value
    const currentLabels: Label[] = this.labelsSubject.getValue();
    // Update the value
    currentLabels.push(...newLabel);
    // Publish the new value
    this.labelsSubject.next([...newLabel]);
  }

  updateSettings(newSettings: any) {
    // Update and emit new settings
    this.settingsSubject.next({ ...newSettings });
  }

  updateYellowOpacityClass(opacity: number) {
    this.yellowOpacityClass = `bg-opacity-${opacity}`;
    this.yellowOpacitySubject.next(this.yellowOpacityClass);
  }
}
