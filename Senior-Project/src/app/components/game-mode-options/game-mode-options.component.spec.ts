import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModeOptionsComponent } from './game-mode-options.component';

describe('GameModeOptionsComponent', () => {
  let component: GameModeOptionsComponent;
  let fixture: ComponentFixture<GameModeOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameModeOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameModeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
