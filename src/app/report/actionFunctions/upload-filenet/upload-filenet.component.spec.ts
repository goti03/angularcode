import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilenetComponent } from './upload-filenet.component';

describe('UploadFilenetComponent', () => {
  let component: UploadFilenetComponent;
  let fixture: ComponentFixture<UploadFilenetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFilenetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
