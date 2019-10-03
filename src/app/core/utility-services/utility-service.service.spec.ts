import { TestBed } from '@angular/core/testing';

import { UtilityServiceService } from './utility-service.service';

describe('UtilityServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilityServiceService = TestBed.get(UtilityServiceService);
    expect(service).toBeTruthy();
  });
});
