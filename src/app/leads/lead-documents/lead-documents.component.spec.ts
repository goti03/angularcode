import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDocumentsComponent } from './lead-documents.component';

describe('ViewDocumentsComponent', () => {
  let component: LeadDocumentsComponent;
  let fixture: ComponentFixture<LeadDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
