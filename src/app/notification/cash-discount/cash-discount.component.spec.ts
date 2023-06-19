import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDiscountComponent } from './cash-discount.component';

describe('CashDiscountComponent', () => {
  let component: CashDiscountComponent;
  let fixture: ComponentFixture<CashDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
