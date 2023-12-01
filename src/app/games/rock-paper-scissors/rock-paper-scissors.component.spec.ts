import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockPaperScissorsComponent } from './rock-paper-scissors.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RockPaperScissorsComponent', () => {
  let component: RockPaperScissorsComponent;
  let fixture: ComponentFixture<RockPaperScissorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RockPaperScissorsComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(RockPaperScissorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
