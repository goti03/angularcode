import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankstatementCompleteComponent } from './bankstatement-complete.component';

describe('BankstatementCompleteComponent', () => {
  let component: BankstatementCompleteComponent;
  let fixture: ComponentFixture<BankstatementCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankstatementCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankstatementCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
