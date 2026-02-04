import { TestBed } from '@angular/core/testing';

import { RequestBodyService } from './request-body.service';

describe('RequestBodyService', () => {
  let service: RequestBodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestBodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
