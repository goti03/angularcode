import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesWaiverFeeComponent } from './charges-waiver-fee.component';

describe('ChargesWaiverFeeComponent', () => {
  let component: ChargesWaiverFeeComponent;
  let fixture: ComponentFixture<ChargesWaiverFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargesWaiverFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesWaiverFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
