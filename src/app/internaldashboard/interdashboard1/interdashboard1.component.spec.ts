import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Interdashboard1Component } from './interdashboard1.component';

describe('Interdashboard1Component', () => {
  let component: Interdashboard1Component;
  let fixture: ComponentFixture<Interdashboard1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Interdashboard1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Interdashboard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
