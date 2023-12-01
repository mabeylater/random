import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpTrackingComponent } from './bp-tracking.component';

describe('BpTrackingComponent', () => {
  let component: BpTrackingComponent;
  let fixture: ComponentFixture<BpTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BpTrackingComponent]
    });
    fixture = TestBed.createComponent(BpTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
