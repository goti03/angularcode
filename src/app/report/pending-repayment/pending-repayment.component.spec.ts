import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRepaymentComponent } from './pending-repayment.component';

describe('PendingRepaymentComponent', () => {
  let component: PendingRepaymentComponent;
  let fixture: ComponentFixture<PendingRepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingRepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
