import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPanComponent } from './upload-pan.component';

describe('UploadPanComponent', () => {
  let component: UploadPanComponent;
  let fixture: ComponentFixture<UploadPanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
