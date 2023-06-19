import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoneyRotationComponent } from './view-money-rotation.component';

describe('ViewMoneyRotationComponent', () => {
  let component: ViewMoneyRotationComponent;
  let fixture: ComponentFixture<ViewMoneyRotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMoneyRotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoneyRotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
