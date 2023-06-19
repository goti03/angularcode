import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OveragereportComponent } from './overagereport.component';

describe('OveragereportComponent', () => {
  let component: OveragereportComponent;
  let fixture: ComponentFixture<OveragereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OveragereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OveragereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
