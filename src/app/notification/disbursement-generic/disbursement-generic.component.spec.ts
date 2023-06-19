import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementGenericComponent } from './disbursement-generic.component';

describe('DisbursementGenericComponent', () => {
  let component: DisbursementGenericComponent;
  let fixture: ComponentFixture<DisbursementGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisbursementGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursementGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
