import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgTransactionDataComponent } from './pg-transaction-data.component';

describe('PgTransactionDataComponent', () => {
  let component: PgTransactionDataComponent;
  let fixture: ComponentFixture<PgTransactionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgTransactionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgTransactionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
