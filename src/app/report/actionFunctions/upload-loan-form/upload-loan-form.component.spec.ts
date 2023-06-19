import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLoanFormComponent } from './upload-loan-form.component';

describe('UploadFilenetComponent', () => {
  let component: UploadLoanFormComponent;
  let fixture: ComponentFixture<UploadLoanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadLoanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLoanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
