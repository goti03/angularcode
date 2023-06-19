import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Update2AComponent } from './Update-2A.component';

describe('Update2AComponent', () => {
  let component: Update2AComponent;
  let fixture: ComponentFixture<Update2AComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Update2AComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Update2AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
