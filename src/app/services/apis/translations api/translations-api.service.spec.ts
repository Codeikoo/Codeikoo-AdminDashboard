import { TestBed } from '@angular/core/testing';

import { TranslationsApiService } from './translations-api.service';

describe('TranslationsApiService', () => {
  let service: TranslationsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
