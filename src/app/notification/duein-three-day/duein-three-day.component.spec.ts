import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DueinThreeDayComponent } from './duein-three-day.component';

describe('DueinThreeDayComponent', () => {
  let component: DueinThreeDayComponent;
  let fixture: ComponentFixture<DueinThreeDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DueinThreeDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DueinThreeDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
