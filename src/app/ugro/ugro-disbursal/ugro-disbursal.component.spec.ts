import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {UgroDisbursalComponent } from './ugro-disbursal.component';

describe('MasterAddComponent', () => {
  let component: UgroDisbursalComponent;
  let fixture: ComponentFixture<UgroDisbursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgroDisbursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgroDisbursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
