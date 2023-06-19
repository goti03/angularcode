import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNachComponent } from './upload-nach.component';

describe('UploadFilenetComponent', () => {
  let component: UploadNachComponent;
  let fixture: ComponentFixture<UploadNachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadNachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadNachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
