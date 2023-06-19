import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashdiscountSavingComponent } from './cashdiscount-saving.component';

describe('CashdiscountSavingComponent', () => {
  let component: CashdiscountSavingComponent;
  let fixture: ComponentFixture<CashdiscountSavingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashdiscountSavingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashdiscountSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
