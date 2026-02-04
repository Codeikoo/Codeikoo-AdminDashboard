import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  DropzoneDirective,
  DropzoneConfigInterface,
} from 'ngx-dropzone-wrapper';
import { firstValueFrom } from 'rxjs';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { SweetAlertService } from 'src/app/services/sweet alert/sweet-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent {
  private sweetAlertService: SweetAlertService = inject(SweetAlertService);
  private attachmentService: AttachmentService = inject(AttachmentService);

  @Input() label: string = 'upload_images';
  @Input() maxFiles: number = 10;
  @Input() existingUrls: string[] = [];
  @Input() required: boolean = false;
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() fileDeleted = new EventEmitter<any>();

  baseUrl: string = environment.baseUrl;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: this.maxFiles,
    url: '#', // Placeholder URL to prevent the error
    autoProcessQueue: false, // Disable automatic upload
    addRemoveLinks: true, // Allow removing files
    acceptedFiles: 'image/*', // Allow only image files
    autoQueue: false,
  };

  @ViewChild(DropzoneDirective, { static: false })
  directiveRef?: DropzoneDirective;
  files: File[] = [];

  constructor() {}

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }

  onFileAdded(file: File): void {
    this.files.push(file);
    this.filesSelected.emit(this.files); // Emit the current files array
  }

  removeFile(file: File | any): void {
    if (file.status === 'canceled') return;
    if (this.files.length === 0 || !this.files.includes(file)) return;

    this.files = this.files.filter((f) => f !== file); // Remove the file from the array
    this.filesSelected.emit(this.files); // Emit the updated files array
  }

  removeImage(path: string): void {
    this.sweetAlertService.showConfirmDialogWithAction(
      {
        icon: 'question',
        title: 'are_you_sure_delete_image',
      },
      () => {
        this.removeImageFromServer(path);
      }
    );
  }

  async removeImageFromServer(path: string): Promise<void> {
    const deleteResponse = await firstValueFrom(
      this.attachmentService.deleteFile(path)
    );

    const { isSuccess, errorCode } = deleteResponse;

    if (isSuccess) {
      this.sweetAlertService.showAlert({
        icon: 'success',
        title: 'image_deleted_successfully',
      });
      setTimeout(() => {
        this.fileDeleted.emit();
      }, 200);
    } else {
      this.sweetAlertService.showAlert({
        icon: 'success',
        text: errorCode,
      });
    }
  }
}
