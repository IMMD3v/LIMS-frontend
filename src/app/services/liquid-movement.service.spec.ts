import { TestBed } from '@angular/core/testing';

import { LiquidMovementService } from './liquid-movement.service';

describe('LiquidMovementService', () => {
  let service: LiquidMovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidMovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
