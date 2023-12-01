import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSnippetsComponent } from './base-snippets.component';

describe('BaseSnippetsComponent', () => {
  let component: BaseSnippetsComponent;
  let fixture: ComponentFixture<BaseSnippetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseSnippetsComponent]
    });
    fixture = TestBed.createComponent(BaseSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
