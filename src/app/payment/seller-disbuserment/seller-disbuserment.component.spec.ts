import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDisburesmentComponent } from './seller-disbuserment.component';

describe('SellerDisburesmentComponent', () => {
  let component: SellerDisburesmentComponent;
  let fixture: ComponentFixture<SellerDisburesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDisburesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDisburesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
