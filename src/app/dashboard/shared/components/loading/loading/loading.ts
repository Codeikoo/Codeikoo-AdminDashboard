import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- (اختياري) Top Progress Bar -->
    <div class="erp-topbar" *ngIf="loader.isLoading()"></div>

    <!-- Overlay -->
    <div
      class="erp-overlay"
      *ngIf="loader.isLoading()"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
    >
      <div class="erp-spinner" role="status" aria-label="Loading"></div>
    </div>
  `,
  styles: [`
    :host {
      --erp-primary: #000865;
      --erp-overlay-bg: rgba(255,255,255,0.65);
      --z: 99999;
    }

    /* (اختياري) Topbar بنفس اللون */
    .erp-topbar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      width: 100%;
      z-index: var(--z);
      background: var(--erp-primary);
      opacity: 0.9;
    }

    .erp-overlay {
      position: fixed;
      inset: 0;
      z-index: var(--z);
      display: grid;
      place-items: center;
      background: var(--erp-overlay-bg);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
    }

    /* ✅ Spinner أكبر + لون #000865 */
    .erp-spinner {
      width: 64px;        /* كبرته */
      height: 64px;
      border-radius: 50%;

      /* Ring ناعم */
      border: 6px solid rgba(0, 8, 101, 0.12);
      border-top-color: var(--erp-primary);
      border-right-color: rgba(0, 8, 101, 0.65);

      animation: spin 0.85s linear infinite;

      /* ظل خفيف ERP */
      box-shadow: 0 10px 30px rgba(0, 8, 101, 0.12);
      background: rgba(255,255,255,0.35);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      .erp-spinner { animation: none !important; }
      .erp-topbar { display: none; }
    }
  `],
})
export class LoaderComponent {
  readonly loader = inject(LoadingService);
}
