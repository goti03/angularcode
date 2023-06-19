import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstsummaryComponent } from './gstsummary.component';

describe('GstsummaryComponent', () => {
  let component: GstsummaryComponent;
  let fixture: ComponentFixture<GstsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
