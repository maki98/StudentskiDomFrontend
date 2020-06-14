import { TestBed } from '@angular/core/testing';

import { RecepcionarAuthGuard } from './recepcionar-auth.guard';

describe('RecepcionarAuthGuard', () => {
  let guard: RecepcionarAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecepcionarAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
