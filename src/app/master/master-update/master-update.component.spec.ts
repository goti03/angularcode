import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUpdateComponent } from './master-update.component';

describe('MasterUpdateComponent', () => {
  let component: MasterUpdateComponent;
  let fixture: ComponentFixture<MasterUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
