import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationInvoiceComponent } from './creation-invoice.component';

describe('CreationInvoiceComponent', () => {
  let component: CreationInvoiceComponent;
  let fixture: ComponentFixture<CreationInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
