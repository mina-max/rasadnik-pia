import { TestBed } from '@angular/core/testing';

import { LogovanjeService } from './logovanje.service';

describe('LogovanjeService', () => {
  let service: LogovanjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogovanjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
