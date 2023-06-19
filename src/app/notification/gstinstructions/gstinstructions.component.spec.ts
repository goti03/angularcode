import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstinstructionsComponent } from './gstinstructions.component';

describe('GstinstructionsComponent', () => {
  let component: GstinstructionsComponent;
  let fixture: ComponentFixture<GstinstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstinstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstinstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
