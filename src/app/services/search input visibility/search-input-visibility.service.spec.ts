import { TestBed } from '@angular/core/testing';

import { SearchInputVisibilityService } from './search-input-visibility.service';

describe('SearchInputVisibilityService', () => {
  let service: SearchInputVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchInputVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
