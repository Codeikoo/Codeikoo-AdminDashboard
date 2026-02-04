import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalDataTableRequest, GenricApiResponse,
    GenricDataTableResponse, } from 'src/app/dashboard/shared/models/shaerd.models';


export interface BaseEntity {
    id?: number;
    [key: string]: any;
}

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
    // Signals for reactive state management
    items = signal<T[]>([]);
    selectedItem = signal<T | null>(null);
    isLoading = signal<boolean>(false);

    // BehaviorSubjects for component communication
    private itemAdded = new BehaviorSubject<T | null>(null);
    itemAdded$ = this.itemAdded.asObservable();

    private itemUpdated = new Subject<T>();
    itemUpdated$ = this.itemUpdated.asObservable();

    private itemDeleted = new Subject<number>();
    itemDeleted$ = this.itemDeleted.asObservable();

    editMode = new BehaviorSubject<boolean>(false);
    editItem = new BehaviorSubject<T | null>(null);

    protected abstract apiUrl: string;

    constructor(protected http: HttpClient) { }

    /**
     * Get paginated data table results
     */
    // getDataTablePagination(
    //     request?: GlobalDataTableRequest
    // ): Observable<GenricDataTableResponse<T>> {
    //     this.isLoading.set(true);

    //     const body = request || {
    //         draw: 1,
    //         start: 0,
    //         length: 10,
    //         search: { value: '', regex: false },
    //     };

    //     return this.http
    //         .post<GenricDataTableResponse<T>>(
    //             `${this.apiUrl}/GetDataTablePaginationFromBody`,
    //             body
    //         )
    //         .pipe(
    //             tap((response) => {
    //                 this.items.set(response.data);
    //                 this.isLoading.set(false);
    //             }),
    //             catchError((error) => {
    //                 this.isLoading.set(false);
    //                 throw error;
    //             })
    //         );
    // }

getDataTablePagination(
  request?: any
): Observable<T[]> {
  this.isLoading.set(true);

  // request ممكن يكون string مباشرة أو object فيه CourseName
  const courseName =
    typeof request === 'string'
      ? request
      : (request?.CourseName ?? request?.courseName ?? '');

  let params = new HttpParams();

  // لو فيه قيمة فعلًا ابعتها، لو فاضية متبعتش أي params
  if (courseName && courseName.trim()) {
    params = params.set('courseName', courseName.trim());
  }

  return this.http
    .get<T[]>(
      `${this.apiUrl}`,
      { params } // لو params فاضي مش هيبعت query أصلاً
    )
    .pipe(
      tap((response) => {
        this.items.set(response);
        this.isLoading.set(false);
      }),
      catchError((error) => {
        this.isLoading.set(false);
        throw error;
      })
    );
}


    /**
     * Get all items (using large page size)
     */
    // getAll(): Observable<T[]> {
    //     const request: GlobalDataTableRequest = {
    //         draw: 1,
    //         start: 0,
    //         length: 9999,
    //         searchValue: '',
    //     };

    //     return this.getDataTablePagination(request).pipe(
    //         map((response) => response.data)
    //     );
    // }

    /**
     * Get item by ID
     */
    // getById(id: number): Observable<T> {
    //     this.isLoading.set(true);

    //     return this.http.get<T>(`${this.apiUrl}/${id}`).pipe(
    //         map((response) => {
    //             if (!response.isSuccess) {
    //                 throw new Error(response.message);
    //             }
    //             return response;
    //         }),
    //         tap((item) => {
    //             this.selectedItem.set(item);
    //             this.isLoading.set(false);
    //         }),
    //         catchError((error) => {
    //             this.isLoading.set(false);
    //             throw error;
    //         })
    //     );
    // }

    getById(id: number): Observable<T> {
  this.isLoading.set(true);

  return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
    map((res) => {
      // لو جاي Wrapper
      if (res && typeof res === 'object' && 'isSuccess' in res) {
        if (!res.isSuccess) {
          throw new Error(res.message || 'Request failed');
        }
        return (res.object ?? res) as T;
      }

      // لو جاي Object مباشر
      return res as T;
    }),
    tap((item) => {
      this.selectedItem.set(item);
      this.isLoading.set(false);
    }),
    catchError((error) => {
      this.isLoading.set(false);
      throw error;
    })
  );
}


    /**
     * Create new item
     */
    // create(item: T): Observable<T> {
    //     this.isLoading.set(true);

    //     const itemToSend = this.beforeSend(item);

    //     return this.http
    //         .post<GenricApiResponse<T>>(`${this.apiUrl}`, itemToSend)
    //         .pipe(
    //             map((response) => {
    //                 if (!response.isSuccess) {
    //                     throw new Error(response.message);
    //                 }
    //                 return response.object;
    //             }),
    //             tap((newItem) => {
    //                 this.itemAdded.next(newItem);
    //                 this.isLoading.set(false);
    //             }),
    //             catchError((error) => {
    //                 this.isLoading.set(false);
    //                 throw error;
    //             })
    //         );
    // }

    create(item: T): Observable<T> {
  this.isLoading.set(true);

  const itemToSend = this.beforeSend(item);

  return this.http.post<any>(`${this.apiUrl}`, itemToSend).pipe(
    map((res) => {
      // لو جاي Wrapper
      if (res && typeof res === 'object' && 'isSuccess' in res) {
        if (!res.isSuccess) {
          throw new Error(res.message || 'Request failed');
        }
        return (res.object ?? res) as T;
      }

      // لو جاي Object مباشر (زي Jobs)
      return res as T;
    }),
    tap((newItem) => {
      this.itemAdded.next(newItem);
      this.isLoading.set(false);
    }),
    catchError((error) => {
      this.isLoading.set(false);
      throw error;
    })
  );
}


    /**
     * Update existing item
     */
    // update(id: number, item: T): Observable<T> {
    //     this.isLoading.set(true);

    //     const itemToSend = this.beforeSend({ ...item, id });

    //     return this.http
    //         .post<GenricApiResponse<T>>(`${this.apiUrl}?id=${id}`, itemToSend)
    //         .pipe(
    //             map((response) => {
    //                 if (!response.isSuccess) {
    //                     throw new Error(response.message);
    //                 }
    //                 return response.object;
    //             }),
    //             tap((updatedItem) => {
    //                 this.itemUpdated.next(updatedItem);
    //                 this.isLoading.set(false);
    //             }),
    //             catchError((error) => {
    //                 this.isLoading.set(false);
    //                 throw error;
    //             })
    //         );
    // }

    update(id: number, item: T): Observable<T> {
  this.isLoading.set(true);

  const itemToSend = this.beforeSend({ ...item, id });

  return this.http.post<any>(`${this.apiUrl}?id=${id}`, itemToSend).pipe(
    map((res) => {
      // لو جاي Wrapper
      if (res && typeof res === 'object' && 'isSuccess' in res) {
        if (!res.isSuccess) {
          throw new Error(res.message || 'Request failed');
        }
        return (res.object ?? res) as T;
      }

      // لو جاي Object مباشر
      return res as T;
    }),
    tap((updatedItem) => {
      this.itemUpdated.next(updatedItem);
      this.isLoading.set(false);
    }),
    catchError((error) => {
      this.isLoading.set(false);
      throw error;
    })
  );
}


    /**
     * Delete item by ID
     */
    delete(id: number): Observable<void> {
        this.isLoading.set(true);

        const params = new HttpParams().set('id', id.toString());

        return this.http
            .post<GenricApiResponse<number>>(`${this.apiUrl}/Remove`, {}, { params })
            .pipe(
                map((response) => {
                    if (!response.isSuccess) {
                        throw new Error(response.message);
                    }
                    return void 0;
                }),
                tap(() => {
                    this.itemDeleted.next(id);
                    this.isLoading.set(false);
                }),
                catchError((error) => {
                    this.isLoading.set(false);
                    throw error;
                })
            );
    }

    /**
     * Override this method to transform data before sending to API
     * Useful for converting types, formatting fields, etc.
     */
    protected beforeSend(item: T): T {
        return item;
    }

    /**
     * Clear selected item
     */
    clearSelection(): void {
        this.selectedItem.set(null);
    }

    /**
     * Set edit mode
     */
    setEditMode(item: T | null): void {
        this.editMode.next(!!item);
        this.editItem.next(item);
    }

    /**
     * Clear edit mode
     */
    clearEditMode(): void {
        this.editMode.next(false);
        this.editItem.next(null);
    }

    /**
     * Patch update (partial update)
     */
    patch(id: number, data: any, endpoint?: string): Observable<T> {
        this.isLoading.set(true);

        const url = endpoint
            ? `${this.apiUrl}/${endpoint}/${id}`
            : `${this.apiUrl}/${id}`;

        return this.http.patch<GenricApiResponse<T>>(url, data).pipe(
            map((response) => {
                if (!response.isSuccess) {
                    throw new Error(response.message);
                }
                return response.object;
            }),
            tap((updatedItem) => {
                this.itemUpdated.next(updatedItem);
                this.isLoading.set(false);
            }),
            catchError((error) => {
                this.isLoading.set(false);
                throw error;
            })
        );
    }
}
