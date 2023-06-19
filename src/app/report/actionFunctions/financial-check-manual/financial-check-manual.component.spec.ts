import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialCheckManualComponent } from './financial-check-manual.component';

describe('FinancialCheckManualComponent', () => {
  let component: FinancialCheckManualComponent;
  let fixture: ComponentFixture<FinancialCheckManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialCheckManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialCheckManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
