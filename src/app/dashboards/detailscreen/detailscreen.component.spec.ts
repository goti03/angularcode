import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscreenComponent } from './detailscreen.component';

describe('DetailscreenComponent', () => {
  let component: DetailscreenComponent;
  let fixture: ComponentFixture<DetailscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
