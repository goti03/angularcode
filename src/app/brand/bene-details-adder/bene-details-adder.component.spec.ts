import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneDetailsAdderComponent } from './bene-details-adder.component';

describe('BeneDetailsAdderComponent', () => {
  let component: BeneDetailsAdderComponent;
  let fixture: ComponentFixture<BeneDetailsAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneDetailsAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneDetailsAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
