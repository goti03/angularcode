import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { whatsapp } from './whatsapp.component';

describe('UpdateGSTn', () => {
  let component: whatsapp;
  let fixture: ComponentFixture<whatsapp>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ whatsapp ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(whatsapp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
