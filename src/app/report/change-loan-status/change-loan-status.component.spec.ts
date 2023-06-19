import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLoanStatusComponent } from './change-loan-status.component';

describe('ChangeLoanStatusComponent', () => {
  let component: ChangeLoanStatusComponent;
  let fixture: ComponentFixture<ChangeLoanStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLoanStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLoanStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
