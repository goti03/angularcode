
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderAddComponent } from './lender-add.component';

describe('LenderAddComponent', () => {
  let component: LenderAddComponent;
  let fixture: ComponentFixture<LenderAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
