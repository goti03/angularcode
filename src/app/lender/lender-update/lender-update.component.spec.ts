import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderUpdateComponent } from './lender-update.component';

describe('LenderUpdateComponent', () => {
  let component: LenderUpdateComponent;
  let fixture: ComponentFixture<LenderUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LenderUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
