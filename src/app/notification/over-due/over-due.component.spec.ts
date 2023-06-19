import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverDueComponent } from './over-due.component';

describe('OverDueComponent', () => {
  let component: OverDueComponent;
  let fixture: ComponentFixture<OverDueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverDueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
