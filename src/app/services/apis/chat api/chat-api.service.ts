import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { SendMessageApiResponse } from 'src/app/interfaces/chat/sendMessageResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  private baseUrl: string = environment.baseUrl;

  private http: HttpClient = inject(HttpClient);

  sendMessage(messageBody: {
    receiverId: string;
    message: string;
    senderId: string;
  }): Observable<SendMessageApiResponse> {
    return this.http
      .post<SendMessageApiResponse>(
        `${this.baseUrl}/api/Chat/SendMessage`,
        messageBody
      )
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error.error.errorCode);
          return of({
            isSuccess: false,
            errorCode: error.error.errorCode ?? 'UnknownError',
            errors: [error.message ?? 'An unknown error occurred'],
            message: {
              receiverId: messageBody.receiverId, // using the receiverId from the request
              message: messageBody.message, // using the message from the request
              senderId: messageBody.senderId, // using the senderId from the request
              createdById: messageBody.senderId, // assuming createdById is the same as senderId
              createdDate: new Date().toISOString(), // setting createdDate to the current date
            },
          } as SendMessageApiResponse);
        })
      );
  }
}
