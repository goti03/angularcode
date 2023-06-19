import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentReportSOAComponent } from './repayment-report-soa.component';

describe('RepaymentReportSOAComponent', () => {
  let component: RepaymentReportSOAComponent;
  let fixture: ComponentFixture<RepaymentReportSOAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaymentReportSOAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaymentReportSOAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
