import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorList } from './anchor-list.component';

describe('PdcComponent', () => {
  let component: AnchorList;
  let fixture: ComponentFixture<AnchorList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
