import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesDetailsComponent } from './rules-details.component';

describe('RulesDetailsComponent', () => {
  let component: RulesDetailsComponent;
  let fixture: ComponentFixture<RulesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
