import { TestBed } from '@angular/core/testing';

import { DialogPreduzeceService } from './dialog-preduzece.service';

describe('DialogPreduzeceService', () => {
  let service: DialogPreduzeceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogPreduzeceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
