import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderMISReportComponent } from './lenderMIS-report.component';

describe('CollectionComponent', () => {
  let component: LenderMISReportComponent;
  let fixture: ComponentFixture<LenderMISReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderMISReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderMISReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
