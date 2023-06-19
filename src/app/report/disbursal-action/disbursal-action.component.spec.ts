import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursalActionComponent } from './disbursal-action.component';

describe('ActionComponent', () => {
  let component: DisbursalActionComponent;
  let fixture: ComponentFixture<DisbursalActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisbursalActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
