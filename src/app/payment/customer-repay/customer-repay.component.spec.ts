import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRepayComponent } from './customer-repay.component';

describe('CustomerRepayComponent', () => {
  let component: CustomerRepayComponent;
  let fixture: ComponentFixture<CustomerRepayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRepayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
