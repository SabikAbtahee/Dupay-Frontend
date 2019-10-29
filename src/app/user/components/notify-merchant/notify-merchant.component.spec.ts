import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyMerchantComponent } from './notify-merchant.component';

describe('NotifyMerchantComponent', () => {
  let component: NotifyMerchantComponent;
  let fixture: ComponentFixture<NotifyMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
