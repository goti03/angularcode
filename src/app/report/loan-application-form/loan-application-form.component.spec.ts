import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplicationFormComponent } from './loan-application-form.component';

describe('ApplicationFormComponent', () => {
  let component: LoanApplicationFormComponent;
  let fixture: ComponentFixture<LoanApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanApplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
