import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLoanDocComponent } from './upload-loan-doc.component';

describe('UploadLoanDocComponent', () => {
  let component: UploadLoanDocComponent;
  let fixture: ComponentFixture<UploadLoanDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadLoanDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLoanDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
