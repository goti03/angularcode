import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelcoRuleComponent } from './telco-rule.component';

describe('TelcoRuleComponent', () => {
  let component: TelcoRuleComponent;
  let fixture: ComponentFixture<TelcoRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelcoRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelcoRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
