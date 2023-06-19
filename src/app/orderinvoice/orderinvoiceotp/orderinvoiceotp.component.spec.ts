import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderinvoiceotpComponent } from './orderinvoiceotp.component';

describe('OrderinvoiceotpComponent', () => {
  let component: OrderinvoiceotpComponent;
  let fixture: ComponentFixture<OrderinvoiceotpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderinvoiceotpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderinvoiceotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
