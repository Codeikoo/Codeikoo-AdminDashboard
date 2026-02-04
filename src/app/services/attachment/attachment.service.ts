import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiResponse } from '../../interfaces/global/baseApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  deleteFile(url: string): Observable<BaseApiResponse> {
    const formData: FormData = new FormData();
    formData.append('Url', url);

    return this.http.post<BaseApiResponse>(
      `${this.baseUrl}/DeleteFile`,
      formData
    );
  }
}
