import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from './text-area.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TextAreaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  exports: [TextAreaComponent],
})
export class TextAreaModule {}
