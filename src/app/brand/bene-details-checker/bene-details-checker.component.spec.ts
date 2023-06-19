import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneDetailsCheckerComponent } from './bene-details-checker.component';

describe('BeneDetailsCheckerComponent', () => {
  let component: BeneDetailsCheckerComponent;
  let fixture: ComponentFixture<BeneDetailsCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneDetailsCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneDetailsCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
