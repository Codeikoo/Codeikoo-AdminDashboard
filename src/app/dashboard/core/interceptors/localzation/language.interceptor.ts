import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const translate = inject(TranslateService);

  const raw = (translate.currentLang || translate.defaultLang || 'ar').toLowerCase();
  const lang = raw.startsWith('en') ? 'en' : 'ar';

  return next(
    req.clone({
      setHeaders: {
        'accept-language': lang,
      },
    })
  );
};
