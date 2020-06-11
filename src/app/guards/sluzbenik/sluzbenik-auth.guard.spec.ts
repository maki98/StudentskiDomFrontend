import { TestBed } from '@angular/core/testing';

import { SluzbenikAuthGuard } from './sluzbenik-auth.guard';

describe('SluzbenikAuthGuard', () => {
  let guard: SluzbenikAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SluzbenikAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
