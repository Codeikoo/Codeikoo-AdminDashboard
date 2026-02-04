import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillEditorComponent } from './quill-editor.component';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuillEditorComponent],
  imports: [CommonModule, QuillModule, TranslateModule, ReactiveFormsModule],
  exports: [QuillEditorComponent],
})
export class QuillInputModule {}
