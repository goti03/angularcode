import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FinancialProcessingComponent} from './financial-processing.component';

describe('BankProcessingComponent', () => {
  let component: FinancialProcessingComponent;
  let fixture: ComponentFixture<FinancialProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
