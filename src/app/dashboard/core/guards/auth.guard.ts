
// import { inject } from '@angular/core';
// import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// /**
//  * ========================================================
//  * Auth Guard (Functional Style - Angular 16+)
//  * --------------------------------------------------------
//  * Protects routes that require authentication.
//  * If user is not logged in → redirect to /auth/login
//  * ========================================================
//  */
// export const authGuard: CanActivateFn = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
// ) => {

//     const authService = inject(AuthService);
//     const router = inject(Router);

//     const isLoggedIn = authService.isAuthenticated();

//     if (isLoggedIn) {
//         return true;
//     }

//     return router.createUrlTree(['/auth/login'], {
//         queryParams: { returnUrl: state.url },
//     });
// };

// /**
//  * ========================================================
//  * Guest Guard (Inverse of Auth Guard)
//  * --------------------------------------------------------
//  * Prevents logged-in users from accessing /auth routes
//  * (e.g. /auth/login or /auth/register)
//  * ========================================================
//  */
// export const guestGuard: CanActivateFn = () => {
//     const authService = inject(AuthService);
//     const router = inject(Router);

//     const isLoggedIn = authService.isAuthenticated();

//     if (isLoggedIn) {
//         return router.createUrlTree(['/']);
//     }

//     return true;
// };
