import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementApprovalComponent } from './disbursement-approval.component';

describe('DisbursementApprovalComponent', () => {
  let component: DisbursementApprovalComponent;
  let fixture: ComponentFixture<DisbursementApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisbursementApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursementApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
