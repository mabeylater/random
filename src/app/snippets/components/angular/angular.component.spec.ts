import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularComponent } from './angular.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AngularComponent', () => {
  let component: AngularComponent;
  let fixture: ComponentFixture<AngularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngularComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(AngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
