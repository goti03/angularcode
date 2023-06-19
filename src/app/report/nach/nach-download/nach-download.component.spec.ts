import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachDownloadComponent } from './nach-download.component';

describe('NachDownloadComponent', () => {
  let component: NachDownloadComponent;
  let fixture: ComponentFixture<NachDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
