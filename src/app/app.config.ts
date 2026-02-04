import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';


// Third-party modules
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GoogleMapsModule } from '@angular/google-maps';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NgProgressModule } from '@ngx-progressbar/core';

// Interceptors
import { LanguageInterceptor } from './interceptors/language/language.interceptor';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { routes } from './app.routes';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';


// Factory function for TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    provideAnimations(),
// ✅ THIS IS THE KEY LINE
    importProvidersFrom(NgProgressModule),
    importProvidersFrom(NgProgressModule.withConfig({
      // optional configuration here
      color: "#ff0000",
      thick: true
    })),
    // Import third-party modules
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      SweetAlert2Module.forRoot(),
      TooltipModule.forRoot(),
      TabsModule.forRoot(),
      GoogleMapsModule,
      // ✅ THIS IS THE KEY LINE
      TablerIconsModule.pick(TablerIcons)
    
    ),

    // Highlight.js configuration
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        },
      },
    },

    // HTTP Interceptors
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
};

