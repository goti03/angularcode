import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachStatusReportComponent } from './nach-status-report.component';

describe('NachStatusReportComponent', () => {
  let component: NachStatusReportComponent;
  let fixture: ComponentFixture<NachStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
