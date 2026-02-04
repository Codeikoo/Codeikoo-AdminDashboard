import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

/**
 * Shared Toast Notification Service
 * Reimplemented using SweetAlert2 instead of Toastr
 */
@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private readonly translate = inject(TranslateService);

    /**
     * Show success toast 
     */
    success(messageKey: string, params?: object): void {
        const message = this.translate.instant(messageKey, params);
        Swal.fire({
            icon: 'success',
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }

    /**
     * Show error toast 
     */
    error(messageKey: string, params?: object): void {
        const message = this.translate.instant(messageKey, params);
        Swal.fire({
            icon: 'error',
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true
        });
    }

    /**
     * Show warning toast 
     */
    warning(messageKey: string, params?: object): void {
        const message = this.translate.instant(messageKey, params);
        Swal.fire({
            icon: 'warning',
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true
        });
    }

    /**
     * Show info toast 
     */
    info(messageKey: string, params?: object): void {
        const message = this.translate.instant(messageKey, params);
        Swal.fire({
            icon: 'info',
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }

    /**
     * Clear all active toasts (SweetAlert closes automatically mostly, but valid for compatibility)
     */
    clear(): void {
        Swal.close();
    }
}
