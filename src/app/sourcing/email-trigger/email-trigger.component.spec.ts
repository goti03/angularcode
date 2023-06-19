import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEamilComponent } from './email-trigger.component';

describe('SourcingUpdateComponent', () => {
  let component: UploadEamilComponent;
  let fixture: ComponentFixture<UploadEamilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadEamilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEamilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
