// label-container.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolboxService } from '../toolbox.service';
import { Subscription } from 'rxjs';
import { Label } from '../types';

@Component({
  selector: 'app-label-container',
  templateUrl: './label-container.component.html',
  styleUrls: ['./label-container.component.scss'],
})
export class LabelContainerComponent implements OnInit, OnDestroy {
  constructor(private toolboxService: ToolboxService) {}
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.toolboxService.labels$.subscribe((labels) => {
        this.Labels = labels;
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  labelHeight = '20';
  digitFontSize = '15';
  locationFontSize = `21`;
  digitWidth = '50';
  locationWidth = '130';
  orientationClass = 'a4-landscape';
  yellowOpacityClass = 'bg-opacity-70';
  fontWeightClass: 'font-black' | '' = 'font-black';
  Labels: Label[] = [

  ];
}
