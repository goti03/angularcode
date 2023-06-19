import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentReportComponent } from './repayment-report.component';

describe('CollectionComponent', () => {
  let component: RepaymentReportComponent;
  let fixture: ComponentFixture<RepaymentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaymentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
