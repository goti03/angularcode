import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTranchComponent } from './detailed-tranch.component';

describe('DetailedTranchComponent', () => {
  let component: DetailedTranchComponent;
  let fixture: ComponentFixture<DetailedTranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedTranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedTranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
