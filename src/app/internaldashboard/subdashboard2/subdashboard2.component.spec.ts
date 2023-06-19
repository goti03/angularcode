import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subdashboard2Component } from './subdashboard2.component';

describe('Subdashboard2Component', () => {
  let component: Subdashboard2Component;
  let fixture: ComponentFixture<Subdashboard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Subdashboard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Subdashboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
