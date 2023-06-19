import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAddComponent } from './upload-add.component';

describe('UploadAddComponent', () => {
  let component: UploadAddComponent;
  let fixture: ComponentFixture<UploadAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
