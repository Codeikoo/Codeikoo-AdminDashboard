import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

export interface DeleteConfirmationDialogData {
    title: string;
    message: string;
    itemName?: string;
}

@Component({
    selector: 'app-delete-confirmation-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule
    ],
    templateUrl: './delete-confirmation-dialog.component.html',
    styleUrl: './delete-confirmation-dialog.component.scss'
})
export class DeleteConfirmationDialogComponent {
    dialogRef = inject(MatDialogRef<DeleteConfirmationDialogComponent>);
    data: DeleteConfirmationDialogData = inject(MAT_DIALOG_DATA);

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
