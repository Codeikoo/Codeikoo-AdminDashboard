// import { Injectable, inject, signal } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Observable, of, throwError } from 'rxjs';
// import { tap, catchError, finalize, map, switchMap } from 'rxjs/operators';
// import {
//     AuthResponse
// } from 'src/app/features/auth/models/shared/shaerd.model';
// import { LoginRequest } from 'src/app/features/auth/models/login.model';
// import { RegisterRequest } from 'src/app/features/auth/models/register.model';
// import { GenricApiResponse } from 'src/app/shared/models/shaerd.models';
// import { UserProfileService } from 'src/app/features/settings/services/user-profile.service';
// import { RequestOtp, ResetPasswordDto } from 'src/app/features/auth/models/forget-password.model';
// // import { UserProfileService } from 'src/app/features/settings/services';

// /**
//  * AuthService (Simplified Version)
//  * --------------------------------
//  * Handles Login & Register only.
//  * Uses Angular Signals for reactive state.
//  * Handles loading and error status cleanly.
//  */
// @Injectable({ providedIn: 'root' })
// export class AuthService {
//     private readonly http = inject(HttpClient);
//     private readonly router = inject(Router);
//     private readonly profileUserService = inject(UserProfileService);

//     private readonly API_URL = 'https://apiforerp.beturn.net';
//     private readonly API_PassWors =
//         'https://apiforerp.beturn.net/api/Identity/Accounts';

//     // ===== Signals (State Management) =====
//     readonly isLoading = signal(false);
//     readonly errorMessage = signal<string | null>(null);
//     readonly isAuthenticated = signal<boolean>(
//         localStorage.getItem('isLoggedIn') === 'true'
//     );

//     constructor() {
//         // Auth state will be verified by APP_INITIALIZER
//     }

//     // ======================================
//     // ============== LOGIN =================
//     // ======================================
//     login(credentials: LoginRequest): Observable<AuthResponse> {
//         this.isLoading.set(true);
//         this.errorMessage.set(null);

//         return this.http
//             .post<AuthResponse>(`${this.API_URL}/login`, credentials, {
//                 withCredentials: true,
//             })
//             .pipe(
//                 switchMap((res) => {
//                     if (!res.isSuccess) {
//                         this.errorMessage.set(res.message || 'Invalid credentials');
//                         return of(res);
//                     }

//                     return this.profileUserService.getProfile().pipe(
//                         tap((profile) => {
//                             this.profileUserService.profile.set(profile);
//                             this.setAuthState(true);
//                         }),
//                         map(() => res)
//                     );
//                 }),
//                 catchError((err) => this.handleError(err, 'Login failed')),
//                 finalize(() => this.isLoading.set(false))
//             );
//     }


//     // ======================================
//     // ============= REGISTER ===============
//     // ======================================
//     register(data: RegisterRequest): Observable<AuthResponse> {
//         this.isLoading.set(true);
//         this.errorMessage.set(null);

//         return this.http
//             .post<AuthResponse>(`${this.API_URL}/register`, data, {
//                 withCredentials: true,
//             })
//             .pipe(
//                 tap((res) => {
//                     this.setAuthState(true);
//                 }),
//                 catchError((err) => this.handleError(err, 'Registration failed')),
//                 finalize(() => this.isLoading.set(false))
//             );
//     }

//     // ======================================
//     // ============ HELPERS =================
//     // ======================================
//     logout(): void {
//         this.isLoading.set(true);

//         this.http
//             .post(`${this.API_URL}/Logout`, {}, { withCredentials: true })
//             .pipe(
//                 finalize(() => {
//                     this.router.navigate(['/auth/login']);
//                     this.isLoading.set(false);
//                     this.clearAuthState();
//                 }),
//                 catchError((err) => {
//                     // Even if logout API fails, clear local state and redirect
//                     // console.error('Logout error:', err);
//                     return throwError(() => err);
//                 })
//             )
//             .subscribe();
//     }

//     isAuth(): Observable<{ isAuth: boolean }> {
//         return this.http.get<{ isAuth: boolean }>(`${this.API_URL}/isAuth`, {
//             withCredentials: true,
//         });
//     }

//     /**
//      * Verify authentication state with server
//      * Called by APP_INITIALIZER on app startup
//      */
//     verifyAuthState(): Observable<boolean> {
//         return this.isAuth().pipe(
//             tap((status) => {
//                 this.setAuthState(status.isAuth);
//             }),
//             catchError(() => {
//                 this.setAuthState(false);
//                 return throwError(() => new Error('Auth verification failed'));
//             }),
//             map((status) => status.isAuth)
//         );
//     }

//     private setAuthState(isAuthenticated: boolean): void {
//         this.isAuthenticated.set(isAuthenticated);
//         localStorage.setItem('isLoggedIn', isAuthenticated.toString());
//     }
//     private getStoredAuthState(): boolean {
//         // Initialize as false, then check auth status asynchronously
//         // The signal will update when the async check completes
//         this.isAuth().subscribe({
//             next: (status) => {
//                 this.setAuthState(status.isAuth);
//             },
//             error: () => {
//                 // If auth check fails, ensure we're marked as not authenticated
//                 this.setAuthState(false);
//             },
//         });
//         // Return false initially - the signal will update async
//         return false;
//     }

//     private clearAuthState(): void {
//         this.isAuthenticated.set(false);
//         localStorage.removeItem('isLoggedIn');
//     }

//     private handleError(
//         error: HttpErrorResponse,
//         defaultMsg: string
//     ): Observable<never> {
//         let message = defaultMsg;

//         if (error.status === 0) message = 'Unable to connect to server.';
//         else if (error.status === 400) message = 'Invalid request data.';
//         else if (error.status === 401) message = 'Invalid credentials.';
//         else if (error.status === 500) message = 'Server error, try again later.';
//         else if (error.error?.message) message = error.error.message;

//         this.errorMessage.set(message);
//         return throwError(() => new Error(message));
//     }

// /**
//    * Request OTP for reset password /api/Identity/Accounts/RequestOtp
//    */
//   requestOtp(email: string): Observable<GenricApiResponse<string>> {
//     return this.http.post<GenricApiResponse<string>>(
//       `${this.API_PassWors}/RequestOtp`,
//       { email }
//     );
//   }
//       /**
//    * Verify the OTP sent to the user email /api/Identity/Accounts/VerifyOtp
//    */
//   verifyOtp(req: RequestOtp): Observable<GenricApiResponse<boolean>> {
//     return this.http.post<GenricApiResponse<boolean>>(
//       `${this.API_PassWors}/VerifyOtp`,
//       req
//     );
//   }

//   /**
//    * Reset the password after verifying OTP /api/Identity/Accounts/ResetPassword
//    */
//   resetPassword(dto: ResetPasswordDto): Observable<GenricApiResponse<boolean>> {
//     return this.http.post<GenricApiResponse<boolean>>(
//       `${this.API_PassWors}/ResetPassword`,
//       dto
//     );
//   }
// }
