import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscomponentComponent } from './miscomponent.component';

describe('MiscomponentComponent', () => {
  let component: MiscomponentComponent;
  let fixture: ComponentFixture<MiscomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
