import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPromotorsComponent } from './lead-promotors.component';

describe('ViewDocumentsComponent', () => {
  let component: LeadPromotorsComponent;
  let fixture: ComponentFixture<LeadPromotorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadPromotorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadPromotorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
