import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNotexistComponent } from './payment-notexist.component';

describe('PaymentNotexistComponent', () => {
  let component: PaymentNotexistComponent;
  let fixture: ComponentFixture<PaymentNotexistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentNotexistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentNotexistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
