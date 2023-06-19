import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedFaComponent } from './rejected-fa.component';

describe('RejectedFaComponent', () => {
  let component: RejectedFaComponent;
  let fixture: ComponentFixture<RejectedFaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedFaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
