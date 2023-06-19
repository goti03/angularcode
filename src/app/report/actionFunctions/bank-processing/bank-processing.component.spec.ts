import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BankProcessingComponent} from './bank-processing.component';

describe('BankProcessingComponent', () => {
  let component: BankProcessingComponent;
  let fixture: ComponentFixture<BankProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
