import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRuleComponent } from './bank-rule.component';

describe('BankRuleComponent', () => {
  let component: BankRuleComponent;
  let fixture: ComponentFixture<BankRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
