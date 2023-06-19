import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdhyamportalComponent } from './udhyamportal.component';

describe('UdhyamportalComponent', () => {
  let component: UdhyamportalComponent;
  let fixture: ComponentFixture<UdhyamportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdhyamportalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdhyamportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
