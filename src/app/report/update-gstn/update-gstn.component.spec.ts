import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGSTn } from './update-gstn.component';

describe('UpdateGSTn', () => {
  let component: UpdateGSTn;
  let fixture: ComponentFixture<UpdateGSTn>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGSTn ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGSTn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
