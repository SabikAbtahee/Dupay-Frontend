import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCompleteModalComponent } from './status-complete-modal.component';

describe('StatusCompleteModalComponent', () => {
  let component: StatusCompleteModalComponent;
  let fixture: ComponentFixture<StatusCompleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusCompleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCompleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
