import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
    selector: 'app-confirm-dialog',
    imports: [MatDialogContent, MatDialogModule, TranslateModule, MaterialModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

    constructor(
        private dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    close(result: boolean) {
        this.dialogRef.close(result);
    }
}
