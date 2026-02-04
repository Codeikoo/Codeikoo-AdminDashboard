import { TestBed } from '@angular/core/testing';

import { Jobservice } from './jobservice';

describe('Jobservice', () => {
  let service: Jobservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Jobservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
