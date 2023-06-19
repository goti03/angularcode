import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaggUserComponent } from './finagg-user.component';

describe('CollectionComponent', () => {
  let component: FinaggUserComponent;
  let fixture: ComponentFixture<FinaggUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinaggUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinaggUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
