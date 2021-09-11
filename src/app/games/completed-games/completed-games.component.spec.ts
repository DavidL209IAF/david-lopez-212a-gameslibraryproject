import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedGamesComponent } from './completed-games.component';

describe('CompletedGamesComponent', () => {
  let component: CompletedGamesComponent;
  let fixture: ComponentFixture<CompletedGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
