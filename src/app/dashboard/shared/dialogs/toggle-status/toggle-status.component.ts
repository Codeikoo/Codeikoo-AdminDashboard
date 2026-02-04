import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

export interface ConfirmationDialogData {
    title: string;
    message: string;
    itemName?: string; // optional, like a row name
    confirmText?: string; // optional, default "Yes"
    cancelText?: string; // optional, default "No"
}

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './toggle-status.component.html',
    styleUrl: './toggle-status.component.scss',
    standalone: true,
    imports: [CommonModule, TranslateModule, MatButtonModule, MatDialogModule, MatIconModule],
})
export class ToggleStatusComponent {
    constructor(
        public dialogRef: MatDialogRef<ToggleStatusComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
    ) { }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
