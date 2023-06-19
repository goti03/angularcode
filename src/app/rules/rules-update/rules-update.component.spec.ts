import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesUpdateComponent } from './rules-update.component';

describe('RulesUpdateComponent', () => {
  let component: RulesUpdateComponent;
  let fixture: ComponentFixture<RulesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
