import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GetTranslationsApiResponse } from 'src/app/interfaces/translation/GetTranslationsApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslationsApiService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  getTranslations<T>(
    path: string,
    payload: any,
    endpoint?: string
  ): Observable<GetTranslationsApiResponse<T>> {
    return this.http
      .post<GetTranslationsApiResponse<T>>(
        `${this.baseUrl}/api${path}${endpoint ? endpoint : '/GetTranslations'}`,
        payload
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching translations:', error);
          return of({
            isSuccess: false,
            errorCode: error?.error?.errorCode ?? 'UnknownError',
            errors: [error.message ?? 'An unknown error occurred'],
            translations: [],
          } as unknown as GetTranslationsApiResponse<T>);
        })
      );
  }

  getTranslation<T>(
    path: string,
    id: string,
    endpoint?: string
  ): Observable<T> {
    return this.http
      .get<T>(
        `${this.baseUrl}/api${path}${
          endpoint ? endpoint : '/GetTranslation'
        }?Id=${id}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching translation:', error);
          return of({
            isSuccess: false,
            errorCode: error?.error?.errorCode ?? 'UnknownError',
            errors: [error.message ?? 'An unknown error occurred'],
            translation: null,
          } as unknown as T);
        })
      );
  }

  createUpdateTranslation<T>(
    path: string,
    body: any,
    isUpdate: boolean,
    endpoint?: string
  ): Observable<T> {
    const url = isUpdate
      ? `${this.baseUrl}/api${path}${
          endpoint ? endpoint : '/UpdateTranslation'
        }`
      : `${this.baseUrl}/api${path}${
          endpoint ? endpoint : '/CreateTranslation'
        }`;

    const request = isUpdate
      ? this.http.post<T>(url, body)
      : this.http.post<T>(url, body);

    return request.pipe(
      catchError((error) => {
        console.error('Error creating/updating translation:', error);
        return of({
          isSuccess: false,
          errorCode: error?.error?.errorCode ?? 'UnknownError',
          errors: [error.message ?? 'An unknown error occurred'],
        } as unknown as T);
      })
    );
  }

  deleteTranslation<T>(
    path: string,
    id: any,
    endpoint?: string
  ): Observable<T> {
    return this.http
      .delete<T>(
        `${this.baseUrl}/api${path}${
          endpoint ? endpoint : '/DeleteTranslation'
        }?Id=${id}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error deleting translation:', error);
          return of({
            isSuccess: false,
            errorCode: error?.error?.errorCode ?? 'UnknownError',
            errors: [error.message ?? 'An unknown error occurred'],
          } as unknown as T);
        })
      );
  }
}
