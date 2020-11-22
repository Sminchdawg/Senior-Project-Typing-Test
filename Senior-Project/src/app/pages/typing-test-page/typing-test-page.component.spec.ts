import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingTestPageComponent } from './typing-test-page.component';

describe('TypingTestPageComponent', () => {
  let component: TypingTestPageComponent;
  let fixture: ComponentFixture<TypingTestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypingTestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
