import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SOAReportComponent } from './SOA-report.component';

describe('CollectionComponent', () => {
  let component: SOAReportComponent;
  let fixture: ComponentFixture<SOAReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SOAReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SOAReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
