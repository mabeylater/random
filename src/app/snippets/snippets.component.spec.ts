import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetsComponent } from './snippets.component';
import { SharedModule } from '../shared/shared.module';

describe('SnippetsComponent', () => {
  let component: SnippetsComponent;
  let fixture: ComponentFixture<SnippetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnippetsComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(SnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
