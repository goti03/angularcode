import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyRotationComponent } from './money-rotation.component';

describe('MoneyRotationComponent', () => {
  let component: MoneyRotationComponent;
  let fixture: ComponentFixture<MoneyRotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyRotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyRotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
