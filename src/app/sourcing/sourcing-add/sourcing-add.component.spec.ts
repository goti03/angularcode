import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcingAddComponent } from './sourcing-add.component';

describe('SourcingAddComponent', () => {
  let component: SourcingAddComponent;
  let fixture: ComponentFixture<SourcingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
