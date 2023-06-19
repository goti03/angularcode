import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachComponent } from './nach.component';

describe('NachComponent', () => {
  let component: NachComponent;
  let fixture: ComponentFixture<NachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
