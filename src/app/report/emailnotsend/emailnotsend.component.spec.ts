import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailnotsendComponent } from './emailnotsend.component';

describe('EmailnotsendComponent', () => {
  let component: EmailnotsendComponent;
  let fixture: ComponentFixture<EmailnotsendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailnotsendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailnotsendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
