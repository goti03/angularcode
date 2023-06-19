import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderinvoicesuccessComponent } from './orderinvoicesuccess.component';

describe('OrderinvoicesuccessComponent', () => {
  let component: OrderinvoicesuccessComponent;
  let fixture: ComponentFixture<OrderinvoicesuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderinvoicesuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderinvoicesuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
