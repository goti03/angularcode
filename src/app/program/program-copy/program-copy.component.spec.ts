import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCopyComponent } from './program-copy.component';

describe('ProgramCopyComponent', () => {
  let component: ProgramCopyComponent;
  let fixture: ComponentFixture<ProgramCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
