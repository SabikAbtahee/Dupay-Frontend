import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBkashComponent } from './payment-bkash.component';

describe('PaymentBkashComponent', () => {
  let component: PaymentBkashComponent;
  let fixture: ComponentFixture<PaymentBkashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentBkashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBkashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
