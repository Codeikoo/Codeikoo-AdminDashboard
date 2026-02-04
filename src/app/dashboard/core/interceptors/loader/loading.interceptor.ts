import { HttpInterceptorFn } from '@angular/common/http';
import { inject, NgZone } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/services/loading.service';

const BYPASS_HEADER = 'X-Bypass-Loader';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has(BYPASS_HEADER) || req.url.includes('/assets/')) {
    const cleanHeaders = req.headers.delete(BYPASS_HEADER);
    return next(req.clone({ headers: cleanHeaders }));
  }

console.log("Loooooooooooooooooooooader")
  const loader = inject(LoadingService);
  const zone = inject(NgZone);

  zone.run(() => loader.show());

  return next(req).pipe(
    finalize(() => zone.run(() => loader.hide()))
  );
};
