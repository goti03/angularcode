import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalStatusComponent } from './regional-status.component';

describe('RegionalStatusComponent', () => {
  let component: RegionalStatusComponent;
  let fixture: ComponentFixture<RegionalStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
