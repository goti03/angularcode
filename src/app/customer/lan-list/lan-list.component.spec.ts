import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanListComponent } from './lan-list.component';

describe('LanListComponent', () => {
  let component: LanListComponent;
  let fixture: ComponentFixture<LanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
