import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Interdashboard2Component } from './interdashboard2.component';

describe('Interdashboard2Component', () => {
  let component: Interdashboard2Component;
  let fixture: ComponentFixture<Interdashboard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Interdashboard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Interdashboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
