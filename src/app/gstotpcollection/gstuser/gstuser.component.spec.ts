import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstuserComponent } from './gstuser.component';

describe('GstuserComponent', () => {
  let component: GstuserComponent;
  let fixture: ComponentFixture<GstuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
