import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subdashboard1Component } from './subdashboard1.component';

describe('Subdashboard1Component', () => {
  let component: Subdashboard1Component;
  let fixture: ComponentFixture<Subdashboard1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Subdashboard1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subdashboard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
