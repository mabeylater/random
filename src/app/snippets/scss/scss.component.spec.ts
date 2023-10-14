import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScssComponent } from './scss.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ScssComponent', () => {
  let component: ScssComponent;
  let fixture: ComponentFixture<ScssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScssComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(ScssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
