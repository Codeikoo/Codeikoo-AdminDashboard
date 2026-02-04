import { TestBed } from '@angular/core/testing';

import { GetUsersApiService } from './get-users-api.service';

describe('GetUsersApiService', () => {
  let service: GetUsersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUsersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
