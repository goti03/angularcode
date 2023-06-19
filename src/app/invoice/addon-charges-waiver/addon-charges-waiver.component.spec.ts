import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonChargesWaiverComponent } from './addon-charges-waiver.component';

describe('AddonChargesWaiverComponent', () => {
  let component: AddonChargesWaiverComponent;
  let fixture: ComponentFixture<AddonChargesWaiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddonChargesWaiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonChargesWaiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
