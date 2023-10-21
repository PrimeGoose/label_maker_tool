import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A4SheetComponent } from './a4-sheet.component';

describe('A4SheetComponent', () => {
  let component: A4SheetComponent;
  let fixture: ComponentFixture<A4SheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [A4SheetComponent]
    });
    fixture = TestBed.createComponent(A4SheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
