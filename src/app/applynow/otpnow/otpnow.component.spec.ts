import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpnowComponent } from './otpnow.component';

describe('OtpnowComponent', () => {
  let component: OtpnowComponent;
  let fixture: ComponentFixture<OtpnowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpnowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
