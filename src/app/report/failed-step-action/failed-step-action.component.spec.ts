import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedStepActionComponent } from './failed-step-action.component';

describe('FailedStepActionComponent', () => {
  let component: FailedStepActionComponent;
  let fixture: ComponentFixture<FailedStepActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedStepActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedStepActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
