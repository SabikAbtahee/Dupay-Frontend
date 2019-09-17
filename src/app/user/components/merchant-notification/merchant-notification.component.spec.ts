import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantNotificationComponent } from './merchant-notification.component';

describe('MerchantNotificationComponent', () => {
  let component: MerchantNotificationComponent;
  let fixture: ComponentFixture<MerchantNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
