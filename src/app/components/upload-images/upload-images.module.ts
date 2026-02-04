import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImagesComponent } from './upload-images.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UploadImagesComponent],
  imports: [CommonModule, DropzoneModule, TranslateModule],
  exports: [UploadImagesComponent],
})
export class UploadImagesModule {}
