import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerInputComponent } from './date-picker-input.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbDatepickerModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DatePickerInputModule {}
