import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadKycComponent } from './upload-kyc.component';

describe('UploadKycComponent', () => {
  let component: UploadKycComponent;
  let fixture: ComponentFixture<UploadKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
