import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchInputVisibilityService {
  private searchVisibility = new BehaviorSubject<boolean>(false);

  searchVisibility$ = this.searchVisibility.asObservable();

  constructor() {}

  showSearchInput(): void {
    this.searchVisibility.next(true);
  }

  hideSearchInput(): void {
    this.searchVisibility.next(false);
  }
}
