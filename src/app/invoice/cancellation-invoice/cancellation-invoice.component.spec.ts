import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationInvoiceComponent } from './cancellation-invoice.component';

describe('CancellationInvoiceComponent', () => {
  let component: CancellationInvoiceComponent;
  let fixture: ComponentFixture<CancellationInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
