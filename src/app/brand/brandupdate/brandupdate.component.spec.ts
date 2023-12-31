import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandupdateComponent } from './brandupdate.component';

describe('BrandupdateComponent', () => {
  let component: BrandupdateComponent;
  let fixture: ComponentFixture<BrandupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
