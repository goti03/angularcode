import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsnowComponent } from './detailsnow.component';

describe('DetailsnowComponent', () => {
  let component: DetailsnowComponent;
  let fixture: ComponentFixture<DetailsnowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsnowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
