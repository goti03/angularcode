import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePanComponent } from './save-pan.component';

describe('SavePanComponent', () => {
  let component: SavePanComponent;
  let fixture: ComponentFixture<SavePanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
