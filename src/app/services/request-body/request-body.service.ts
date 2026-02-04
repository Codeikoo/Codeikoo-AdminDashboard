import { Injectable } from '@angular/core';
import {
  ApiRequestBody,
  Filter,
  Sort,
} from '../../interfaces/global/ApiRequestBody';

import { BehaviorSubject, debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
/**
 * Service to manage and update the API request body state.
 */
export class RequestBodyService {
  private initialRequestBody: ApiRequestBody = {
    pageNumber: 1,
    pageSize: 10,
    filters: [],
    sorts: [],
    searchTerm: null,
    userId: null,
  };

  private requestBodySubject = new BehaviorSubject<ApiRequestBody>(
    this.initialRequestBody
  );
  requestBody$ = this.requestBodySubject.asObservable().pipe(debounceTime(250));

  constructor(private router: Router) {}

  /**
   * Updates the current request body with partial changes.
   * @param partialBody Partial request body to merge with the current state.
   */
  updateRequestBody(partialBody: Partial<ApiRequestBody>): void {
    const currentBody = this.requestBodySubject.value;
    const updatedBody = { ...currentBody, ...partialBody };
    this.requestBodySubject.next(updatedBody);
  }

  /**
   * Adds a filter to the current request body.
   * @param filter Filter to be added.
   */
  addFilter(filter: Filter): void {
    const currentBody = this.requestBodySubject.value;
    const updatedFilters = [...currentBody.filters, filter];
    this.requestBodySubject.next({ ...currentBody, filters: updatedFilters });
  }

  /**
   * Removes a filter from the current request body by property name.
   * @param propertyName Name of the filter property to be removed.
   */
  removeFilter(propertyName: string): void {
    const currentBody = this.requestBodySubject.value;
    const updatedFilters = currentBody.filters.filter(
      (f: any) => f.propertyName !== propertyName
    );
    this.requestBodySubject.next({ ...currentBody, filters: updatedFilters });
  }

  /**
   * Clears all filters from the current request body.
   */
  clearFilters(): void {
    const currentBody = this.requestBodySubject.value;
    this.requestBodySubject.next({ ...currentBody, filters: [] });
  }

  /**
   * Sets a single filter in the current request body, replacing any existing filters with the same property name.
   * @param filter Filter to be set.
   */
  setFilter(filter: Filter): void {
    const currentBody = this.requestBodySubject.value;
    // Remove any existing filters with the same property name
    const updatedFilters = currentBody.filters.filter(
      (f: any) => f.propertyName !== filter.propertyName
    );
    // Add the new filter
    updatedFilters.push(filter);
    this.requestBodySubject.next({ ...currentBody, filters: updatedFilters });
  }

  /**
   * Replaces the current filters with the new filter.
   * @param filter Filter to be set.
   */
  replaceFilter(filter: Filter): void {
    const currentBody = this.requestBodySubject.value;
    // Replace existing filters with the new filter
    this.requestBodySubject.next({ ...currentBody, filters: [filter] });
  }

  /**
   * Adds a sort option to the current request body.
   * @param sort Sort option to be added.
   */
  addSort(sort: Sort): void {
    const currentBody = this.requestBodySubject.value;
    const updatedSorts = [...currentBody.sorts, sort];
    this.requestBodySubject.next({ ...currentBody, sorts: updatedSorts });
  }

  /**
   * Removes a sort option from the current request body by property name.
   * @param propertyName Name of the sort property to be removed.
   */
  removeSort(propertyName: string): void {
    const currentBody = this.requestBodySubject.value;
    const updatedSorts = currentBody.sorts.filter(
      (s: any) => s.propertyName !== propertyName
    );
    this.requestBodySubject.next({ ...currentBody, sorts: updatedSorts });
  }

  /**
   * Adds a filter option ID to the current request body.
   * This method is used specifically for the 'getIdea' API call.
   * @param filterOptionId Filter option ID to be added.
   */
  addFilterOptionId(filterOptionId: string): void {
    const currentBody = this.requestBodySubject.value;
    const filterOptionIds = currentBody.filterOptionIds
      ? [...currentBody.filterOptionIds, filterOptionId]
      : [filterOptionId];
    this.requestBodySubject.next({ ...currentBody, filterOptionIds });
  }

  /**
   * Removes a filter option ID from the current request body.
   * This method is used specifically for the 'getIdea' API call.
   * @param filterOptionId Filter option ID to be removed.
   */
  removeFilterOptionId(filterOptionId: string): void {
    const currentBody = this.requestBodySubject.value;
    if (currentBody.filterOptionIds) {
      const updatedFilterOptionIds = currentBody.filterOptionIds.filter(
        (id: any) => id !== filterOptionId
      );
      this.requestBodySubject.next({
        ...currentBody,
        filterOptionIds: updatedFilterOptionIds,
      });
    }
  }

  /**
   * Clears all filter option IDs from the current request body.
   */
  clearFilterOptionIds(): void {
    const currentBody = this.requestBodySubject.value;
    this.requestBodySubject.next({ ...currentBody, filterOptionIds: [] });
  }

  /**
   * Updates the page size in the current request body.
   * @param pageSize New page size to be set.
   */
  updatePageSize(pageSize: number): void {
    const currentBody = this.requestBodySubject.value;
    this.requestBodySubject.next({ ...currentBody, pageSize });
  }

  /**
   * Updates the page number in the current request body.
   * @param pageNumber New page number to be set.
   */
  updatePageNumber(pageNumber: number): void {
    const currentBody = this.requestBodySubject.value;
    this.requestBodySubject.next({ ...currentBody, pageNumber });
  }

  /**
   * Updates the user ID in the current request body.
   * @param userId New user ID to be set, or null to clear the user ID.
   */
  updateUserId(userId: string | null): void {
    const currentBody = this.requestBodySubject.value;
    this.requestBodySubject.next({ ...currentBody, userId });
  }

  /**
   * Adds a search term to the current request body.
   * @param searchTerm Search term to be added.
   */
  addSearchTerm(searchTerm: string | null): void {
    const currentBody = this.requestBodySubject.value;
    this.requestBodySubject.next({ ...currentBody, searchTerm });
  }

  /**
   * Removes the search term from the current request body.
   */
  removeSearchTerm(): void {
    const currentBody = this.requestBodySubject.value;
    this.requestBodySubject.next({ ...currentBody, searchTerm: null });
  }

  /**
   * Retrieves the current request body.
   * @returns The current request body.
   */
  getCurrentRequestBody(): ApiRequestBody {
    return this.requestBodySubject.getValue();
  }

  /**
   * Resets the request body to the initial state.
   */
  clearRequestBody(): void {
    this.requestBodySubject.next(this.initialRequestBody);
  }

  /**
   * Generates a URL with the current request body as query parameters.
   * @returns The generated URL.
   */
  generateShareableLink(): string {
    const currentBody = this.getCurrentRequestBody();
    const queryParams = new URLSearchParams();

    Object.entries(currentBody).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((val) => queryParams.append(key, val));
        } else {
          queryParams.append(key, value as string);
        }
      }
    });

    return `${this.router.url.split('?')[0]}?${queryParams.toString()}`;
  }

  /**
   * Parses the request body from URL query parameters and updates the state.
   * @param params The URL query parameters.
   */
  parseRequestBodyFromUrl(params: URLSearchParams): void {
    const requestBody: Partial<ApiRequestBody> = {};

    params.forEach((value, key) => {
      if (key in this.initialRequestBody) {
        if (
          Array.isArray(this.initialRequestBody[key as keyof ApiRequestBody])
        ) {
          requestBody[key as keyof ApiRequestBody] = params.getAll(key) as any;
        } else {
          requestBody[key as keyof ApiRequestBody] = value as any;
        }
      }
    });

    this.updateRequestBody(requestBody);
  }
}
