import { TestBed } from '@angular/core/testing';

import { WithdrawalService } from './withdrawal.service';

describe('WithdrawalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WithdrawalService = TestBed.get(WithdrawalService);
    expect(service).toBeTruthy();
  });
});
