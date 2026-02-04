import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecureLSService } from '../../services/secureLS/secure-ls.service';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private secureLSService: SecureLSService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the current language from the LanguageService
    const languageCode = this.secureLSService.decryptData('lang') ?? 'ar';

    // Clone the request and add the Language-Code header
    const langReq = request.clone({
      setHeaders: {
        'Language-Code':
          languageCode && languageCode.length ? languageCode : 'ar',
      },
    });

    // Pass the modified request to the next handler
    return next.handle(langReq);
  }
}
