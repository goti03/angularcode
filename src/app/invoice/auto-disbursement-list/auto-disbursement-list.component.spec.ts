import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDisbursementListComponent } from './auto-disbursement-list.component';

describe('AutoDisbursementListComponent', () => {
  let component: AutoDisbursementListComponent;
  let fixture: ComponentFixture<AutoDisbursementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoDisbursementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDisbursementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
