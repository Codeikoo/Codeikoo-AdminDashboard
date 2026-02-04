// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { map } from 'rxjs/operators';
// import { UserStateService } from '../../services/user state/user-state.service';
// import { SweetAlertService } from '../../services/sweet alert/sweet-alert.service';

// export const AuthGuard: CanActivateFn = (route, state) => {
//   const userStateService = inject(UserStateService);
//   const router = inject(Router);
//   const sweetAlert = inject(SweetAlertService);

//   return userStateService.userToken$.pipe(
//     map((token) => {
//       if (token) {
//         return true; // Allow access if the user is authenticated
//       } else {
//         sweetAlert.showAlert({
//           icon: 'warning',
//           title: 'login_required',
//         });
//         router.navigate(['/auth/login'], {
//           queryParams: { returnUrl: state.url },
//         });
//         return false;
//       }
//     })
//   );
// };

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SweetAlertService } from '../../services/sweet alert/sweet-alert.service';
import { SecureLSService } from 'src/app/services/secureLS/secure-ls.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  // const userStateService = inject(UserStateService);
  // const router = inject(Router);
  // const sweetAlert = inject(SweetAlertService);
  // const secureLsService = inject(SecureLSService);

  // return userStateService.userToken$.pipe(
  //   map((token) => {
  //     if (!token) {
  //       sweetAlert.showAlert({
  //         icon: 'warning',
  //         title: 'login_required',
  //       });
  //       router.navigate(['/auth/login'], {
  //         queryParams: { returnUrl: state.url },
  //       });
  //       return false;
  //     }

  //     const allowedPages = secureLsService.decryptData('pagesAndRoles') ?? [];

  //     const [module, pageType] = state.url
  //       .split('/')
  //       .filter((str: string) => str && str.length);

  //     const modulePage = (
  //       Array.isArray(allowedPages) && allowedPages.length ? allowedPages : []
  //     ).find(
  //       (page: any) =>
  //         page.pagePath
  //           .split('/')
  //           .filter((str: string) => str && str.length)[0] === module
  //     );

  //     if (
  //       (pageType == 'create' || pageType == 'update') &&
  //       modulePage &&
  //       modulePage['pageId']
  //     ) {
  //       const hasPermission = modulePage.roles.some((role: any) => {
  //         return (
  //           (pageType === 'create' && role.name === 'Create') ||
  //           (pageType === 'update' && role.name === 'Update')
  //         );
  //       });

  //       if (hasPermission) {
  //         return true;
  //       } else {
  //         sweetAlert.showAlert({
  //           icon: 'error',
  //           title: 'access_denied',
  //           text: 'access_denied_message',
  //         });

  //         router.navigate([allowedPages[0].pagePath ?? '/dashboard']);

  //         return false;
  //       }
  //     }

  //     if (Array.isArray(allowedPages) && allowedPages.length) {
  //       const canAccess = allowedPages.some((page: any) =>
  //         state.url.startsWith(page.pagePath)
  //       );

  //       if (!canAccess) {
  //         sweetAlert.showAlert({
  //           icon: 'error',
  //           title: 'access_denied',
  //           text: 'access_denied_message',
  //         });

  //         router.navigate([allowedPages[0].pagePath ?? '/dashboard']);

  //         return false;
  //       }
  //     }

  //     return true;
  //   })
  // );
  return true
};
