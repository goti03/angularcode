import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerActionComponent } from './seller-action.component';

describe('UploadFilenetComponent', () => {
  let component: SellerActionComponent;
  let fixture: ComponentFixture<SellerActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
