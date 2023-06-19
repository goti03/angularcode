import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgroComponent } from './ugro.component';

describe('UgroComponent', () => {
  let component: UgroComponent;
  let fixture: ComponentFixture<UgroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
