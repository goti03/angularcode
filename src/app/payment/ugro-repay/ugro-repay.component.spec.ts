import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgroRepayComponent } from './ugro-repay.component';

describe('UgroRepayComponent', () => {
  let component: UgroRepayComponent;
  let fixture: ComponentFixture<UgroRepayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgroRepayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgroRepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
