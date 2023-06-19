import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgroNachComponent } from './ugro-nach.component';

describe('MasterAddComponent', () => {
  let component: UgroNachComponent;
  let fixture: ComponentFixture<UgroNachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgroNachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgroNachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
