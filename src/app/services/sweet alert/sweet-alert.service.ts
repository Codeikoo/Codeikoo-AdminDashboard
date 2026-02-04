import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

/**
 * Allowed notify types
 */
export type NotifyType = 'success' | 'error' | 'warning' | 'info' | 'question';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor(private translateService: TranslateService) {}

  /**
   * Detect text direction based on current language
   */
  private getDirection(): 'rtl' | 'ltr' {
    const currentLang = this.translateService.currentLang;
    return ['ar', 'ur'].includes(currentLang) ? 'rtl' : 'ltr';
  }

  /**
   * Toast notification (small popup)
   */
  showToast(options: SweetAlertOptions): void {
    Swal.fire({
      toast: true,
      position: this.getDirection() === 'ltr' ? 'top-end' : 'top-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
      ...options,
      title: options.title
        ? this.translateService.instant(options.title.toString())
        : undefined,
      text: options.text
        ? this.translateService.instant(options.text.toString())
        : undefined,
    });
  }

  /**
   * Standard alert
   */
  showAlert(options: SweetAlertOptions): void {
    Swal.fire({
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        confirmButton: 'bg-main',
      },
      ...options,
      confirmButtonText: this.translateService.instant('ok'),
      title: options.title
        ? this.translateService.instant(options.title.toString())
        : undefined,
      text: options.text
        ? this.translateService.instant(options.text.toString())
        : undefined,
    });
  }

  /**
   * Yes / No confirmation dialog
   */
  showConfirmationAlert(
    options: SweetAlertOptions
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      showCancelButton: true,
      confirmButtonText: this.translateService.instant('YES'),
      cancelButtonText: this.translateService.instant('NO'),
      ...options,
    });
  }

  /**
   * Confirmation dialog with action
   */
  async showConfirmDialogWithAction(
    options: SweetAlertOptions,
    onConfirm: () => void
  ): Promise<SweetAlertResult> {
    const result = await Swal.fire({
      showCancelButton: true,
      confirmButtonText: this.translateService.instant('confirm'),
      cancelButtonText: this.translateService.instant('cancel'),
      customClass: {
        confirmButton: 'bg-main',
      },
      ...options,
      title: options.title
        ? this.translateService.instant(options.title.toString())
        : undefined,
      text: options.text
        ? this.translateService.instant(options.text.toString())
        : undefined,
    });

    if (result.isConfirmed) {
      onConfirm();
    }

    return result;
  }

  /**
   * Input dialog
   */
  async showInputDialog(
    options: SweetAlertOptions,
    onInput: (value: string) => void
  ): Promise<SweetAlertResult> {
    const result = await Swal.fire({
      input: 'text',
      showCancelButton: true,
      confirmButtonText: this.translateService.instant('submit'),
      cancelButtonText: this.translateService.instant('cancel'),
      ...options,
    });

    if (result.isConfirmed && result.value) {
      onInput(result.value);
    }

    return result;
  }

  /**
   * 🔥 notify() — Backward compatible with old code
   */
  notify(type: NotifyType, title: string, text?: string): void {
    this.showToast({
      icon: type,
      title,
      text,
    });
  }
}
