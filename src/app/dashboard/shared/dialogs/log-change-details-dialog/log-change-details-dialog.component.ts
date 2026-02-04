import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { TablerIconComponent } from 'angular-tabler-icons';
import { EntityLog } from '../../models/logging/logging.model';
import { Subscription } from 'rxjs';

interface LogChangeDialogData {
    log: EntityLog;
    entityName?: string;
}

@Component({
    selector: 'app-log-change-details-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatChipsModule,
        MatTooltipModule,
        TranslateModule,
        // TablerIconComponent
    ],
    templateUrl: './log-change-details-dialog.component.html',
    styleUrls: ['./log-change-details-dialog.component.scss']
})
export class LogChangeDetailsDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<LogChangeDetailsDialogComponent>);
    readonly data = inject<LogChangeDialogData>(MAT_DIALOG_DATA);
    private readonly translate = inject(TranslateService);
    private readonly document = inject(DOCUMENT);


    private langSub!: Subscription;

    currentLang = signal<string>(
        this.translate.currentLang || this.translate.defaultLang || 'en'
    );

    direction = signal<'ltr' | 'rtl'>(
        this.isRtl(this.currentLang()) ? 'rtl' : 'ltr'
    );
    ngOnInit(): void {
        this.langSub = this.translate.onLangChange.subscribe(event => {
            this.currentLang.set(event.lang);
            const dir = this.isRtl(event.lang) ? 'rtl' : 'ltr';
            this.direction.set(dir);

            this.document.documentElement.dir = dir;
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    getActionIcon(action: string): string {
        const icons: Record<string, string> = {
            'ADD': 'plus',
            'UPDATE': 'edit',
            'DELETE': 'trash',
            'VIEW': 'eye'
        };
        return icons[action] || 'info-circle';
    }

    getActionColor(action: string): string {
        const colors: Record<string, string> = {
            'ADD': 'success',
            'UPDATE': 'primary',
            'DELETE': 'warn',
            'VIEW': 'accent'
        };
        return colors[action] || '';
    }

    formatDateTime(dateValue: Date | string): string {
        if (!dateValue) return '-';
        const date = new Date(dateValue);
        const isArabic = this.currentLang()?.startsWith('ar');

        return date.toLocaleString(
            isArabic ? 'ar-EG' : 'en-GB',
            {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }
        );
    }

    hasChanges(): boolean {
        return this.data.log.changes && this.data.log.changes.length > 0;
    }

    getChangeIcon(oldValue: string, newValue: string): string {
        if (!oldValue || oldValue === 'null' || oldValue === '-') return 'circle-plus';
        if (!newValue || newValue === 'null' || newValue === '-') return 'circle-minus';
        return 'arrow-right';
    }

    getChangeClass(oldValue: string, newValue: string): string {
        if (!oldValue || oldValue === 'null' || oldValue === '-') return 'change-added';
        if (!newValue || newValue === 'null' || newValue === '-') return 'change-removed';
        return 'change-modified';
    }
    private isRtl(lang: string): boolean {
        return ['ar', 'fa', 'ur'].includes(lang);
    }

    ngOnDestroy(): void {
        this.langSub?.unsubscribe();
    }
}
