import { TestBed } from '@angular/core/testing';

import { DialogKorpaService } from './dialog-korpa.service';

describe('DialogKorpaService', () => {
  let service: DialogKorpaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogKorpaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
