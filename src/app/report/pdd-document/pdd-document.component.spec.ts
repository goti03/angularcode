import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PddDocumentComponent } from './pdd-document.component';

describe('PddDocumentComponent', () => {
  let component: PddDocumentComponent;
  let fixture: ComponentFixture<PddDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PddDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PddDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
