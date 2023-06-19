import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gst3bComponent } from './gst3b.component';

describe('Gst3bComponent', () => {
  let component: Gst3bComponent;
  let fixture: ComponentFixture<Gst3bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gst3bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gst3bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
