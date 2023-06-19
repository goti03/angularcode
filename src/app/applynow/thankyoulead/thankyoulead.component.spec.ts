import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyouleadComponent } from './thankyoulead.component';

describe('ThankyouleadComponent', () => {
  let component: ThankyouleadComponent;
  let fixture: ComponentFixture<ThankyouleadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankyouleadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankyouleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
