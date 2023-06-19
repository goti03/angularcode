import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcingListComponent } from './sourcing-list.component';

describe('SourcingListComponent', () => {
  let component: SourcingListComponent;
  let fixture: ComponentFixture<SourcingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
