import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantRequestsComponent } from './merchant-requests.component';

describe('MerchantRequestsComponent', () => {
  let component: MerchantRequestsComponent;
  let fixture: ComponentFixture<MerchantRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
