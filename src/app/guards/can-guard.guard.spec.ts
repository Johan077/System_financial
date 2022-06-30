import { TestBed } from '@angular/core/testing';

import { CanGuardGuard } from './can-guard.guard';

describe('CanGuardGuard', () => {
  let guard: CanGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
