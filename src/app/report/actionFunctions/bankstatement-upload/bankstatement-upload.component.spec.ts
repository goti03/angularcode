import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankstatementUploadComponent } from './bankstatement-upload.component';

describe('BankstatementUploadComponent', () => {
  let component: BankstatementUploadComponent;
  let fixture: ComponentFixture<BankstatementUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankstatementUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankstatementUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
