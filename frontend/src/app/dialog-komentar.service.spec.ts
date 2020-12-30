import { TestBed } from '@angular/core/testing';

import { DialogKomentarService } from './dialog-komentar.service';

describe('DialogKomentarService', () => {
  let service: DialogKomentarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogKomentarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
