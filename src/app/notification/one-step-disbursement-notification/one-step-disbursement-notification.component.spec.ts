import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneStepDisbursementNotificationComponent } from './one-step-disbursement-notification.component';

describe('OneStepDisbursementNotificationComponent', () => {
  let component: OneStepDisbursementNotificationComponent;
  let fixture: ComponentFixture<OneStepDisbursementNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneStepDisbursementNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneStepDisbursementNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
