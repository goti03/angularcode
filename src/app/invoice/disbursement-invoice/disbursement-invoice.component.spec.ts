import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementInvoiceComponent } from './disbursement-invoice.component';

describe('DisbursementInvoiceComponent', () => {
  let component: DisbursementInvoiceComponent;
  let fixture: ComponentFixture<DisbursementInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisbursementInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursementInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
