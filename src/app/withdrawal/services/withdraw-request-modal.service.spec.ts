import { TestBed } from '@angular/core/testing';

import { WithdrawRequestModalService } from './withdraw-request-modal.service';

describe('WithdrawRequestModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WithdrawRequestModalService = TestBed.get(WithdrawRequestModalService);
    expect(service).toBeTruthy();
  });
});
