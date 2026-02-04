import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserProfileService } from 'src/app/features/settings/services/user-profile.service';

export function initializeAuth() {
    const authService = inject(AuthService);
    const userProfileService = inject(UserProfileService);

    return async () => {
        try {
            // 1️⃣ Ensure User is Logged in
            const isAuthenticated = await firstValueFrom(
                authService.verifyAuthState()
            );

            // 2️⃣ If logged in → fetch profile
            if (isAuthenticated) {
                await firstValueFrom(userProfileService.getProfile());
            }
        } catch (error) {
            console.warn('Startup auth/profile check failed', error);
        }
    };
}
