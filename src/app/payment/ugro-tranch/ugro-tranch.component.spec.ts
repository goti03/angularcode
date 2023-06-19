import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgroTranchComponent } from './ugro-tranch.component';

describe('UgroTranchComponent', () => {
  let component: UgroTranchComponent;
  let fixture: ComponentFixture<UgroTranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgroTranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgroTranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
