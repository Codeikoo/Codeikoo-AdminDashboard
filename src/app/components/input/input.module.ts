import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FeatherIconModule,
  ],
  exports: [InputComponent],
})
export class InputModule {}
