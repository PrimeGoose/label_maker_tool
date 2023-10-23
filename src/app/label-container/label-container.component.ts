// label-container.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolboxService } from '../toolbox.service';
import { Label } from '../types';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-label-container',
  templateUrl: './label-container.component.html',
  styleUrls: ['./label-container.component.scss', './print.css'],
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

    this.subscription.add(
      this.toolboxService.settings$.subscribe((settings) => {
        this.labelHeight = settings.labelHeight;
        this.digitFontSize = settings.digitFontSize;
        this.locationFontSize = settings.locationFontSize;
        this.digitWidth = settings.digitWidth;
        this.locationWidth = settings.locationWidth;
      })
    );
    // yellowOpacityClass = 'bg-opacity-70';
    this.subscription.add(
      this.toolboxService.yellowOpacity$.subscribe((yellowOpacityClass) => {
        this.yellowOpacityClass = yellowOpacityClass;
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
  Labels: Label[] = [];
}
