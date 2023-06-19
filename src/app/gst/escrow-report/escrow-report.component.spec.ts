import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowReportComponent } from './escrow-report.component';

describe('EscrowReportComponent', () => {
  let component: EscrowReportComponent;
  let fixture: ComponentFixture<EscrowReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrowReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
