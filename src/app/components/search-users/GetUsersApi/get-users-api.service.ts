import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetSearchedUsersResponse } from '../GetUsersInterface/GetUsersInterface';

@Injectable({
  providedIn: 'root',
})
export class GetUsersApiService {
  private baseUrl: string = environment.baseUrl;
  private http: HttpClient = inject(HttpClient);
  private path: string = `/GetUsersForProfessionals`;

  getSearchedUsers(
    searchTerm: string | null = null
  ): Observable<GetSearchedUsersResponse> {
    const body = {
      pageSize: 99999,
      pageNum: 1,
      searchTerm,
    };
    return this.http
      .post<GetSearchedUsersResponse>(`${this.baseUrl}${this.path}`, body)
      .pipe(
        catchError((error) => {
          return of({
            isSuccess: false,
            errorCode: error.error.errorCode ?? 'UnknownError',
            errors: [error.message ?? 'An unknown error occurred'],
            result: {
              items: [],
              pageNumber: 0,
              totalPages: 0,
              totalCount: 0,
              hasPreviousPage: false,
              hasNextPage: false,
            },
          } as GetSearchedUsersResponse);
        })
      );
  }
}
