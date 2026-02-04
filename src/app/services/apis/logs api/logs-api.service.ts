import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { GetLogsResponse } from 'src/app/interfaces/Logs/GetLogsResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogsApiService {
  private baseUrl: string = environment.baseUrl;
  private http: HttpClient = inject(HttpClient);
  private path: string = `/api/Logs`;

  getItemsLogs(
    tableName: string | string[],
    colomnId: string
  ): Observable<GetLogsResponse> {
    const body = {
      filters: [
        {
          propertyName: 'tableName',
          values: Array.isArray(tableName) ? tableName : [tableName],
          type: 'Equals',
          operator: 'And',
        },
        {
          propertyName: 'ColomnId',
          values: [colomnId],
          type: 'Equals',
          operator: 'And',
        },
      ],
    };
    return this.http
      .post<GetLogsResponse>(`${this.baseUrl}${this.path}/GetLogs`, body)
      .pipe(
        catchError((error) => {
          return of({
            isSuccess: false,
            errorCode: error.error.errorCode ?? 'UnknownError',
            errors: [error.message ?? 'An unknown error occurred'],
            logs: {
              items: [],
              pageNumber: 0,
              totalPages: 0,
              totalCount: 0,
              hasPreviousPage: false,
              hasNextPage: false,
            },
          } as GetLogsResponse);
        })
      );
  }
}
