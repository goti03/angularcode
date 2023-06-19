import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionPendingComponent } from './description-pending.component';

describe('DescriptionPendingComponent', () => {
  let component: DescriptionPendingComponent;
  let fixture: ComponentFixture<DescriptionPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
