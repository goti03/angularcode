import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonidentifiedPaymentComponent } from './nonidentified-payment.component';

describe('NonidentifiedPaymentComponent', () => {
  let component: NonidentifiedPaymentComponent;
  let fixture: ComponentFixture<NonidentifiedPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonidentifiedPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonidentifiedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
