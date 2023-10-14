import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowershellComponent } from './powershell.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('PowershellComponent', () => {
  let component: PowershellComponent;
  let fixture: ComponentFixture<PowershellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PowershellComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(PowershellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
