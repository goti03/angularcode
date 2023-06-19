import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginnowComponent } from './loginnow.component';

describe('LoginnowComponent', () => {
  let component: LoginnowComponent;
  let fixture: ComponentFixture<LoginnowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginnowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
