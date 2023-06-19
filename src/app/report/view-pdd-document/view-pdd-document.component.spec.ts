import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPddDocumentComponent } from './view-pdd-document.component';

describe('ViewPddDocumentComponent', () => {
  let component: ViewPddDocumentComponent;
  let fixture: ComponentFixture<ViewPddDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPddDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPddDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
