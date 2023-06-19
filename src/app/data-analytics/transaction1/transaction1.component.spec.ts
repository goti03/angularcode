import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Transaction1Component } from './transaction1.component';

describe('Transaction1Component', () => {
  let component: Transaction1Component;
  let fixture: ComponentFixture<Transaction1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Transaction1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Transaction1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
