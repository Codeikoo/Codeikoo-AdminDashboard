import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SHARED_IMPORTS } from 'src/app/shared/shared.imports';

@Component({
  selector: 'app-date-picker-input',
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.scss'],
  imports:[...SHARED_IMPORTS]
})
export class DatePickerInputComponent {
  /**
   * Label for the input field, displayed as the placeholder and translated.
   */
  @Input() label: string = '';

  /**
   * FormControl instance to bind the input field to form control.
   */
  @Input() control: FormControl | any;

  /**
   * Placeholder text for the input field.
   */
  @Input() placeholder: string = '';

  /**
   * Whether the input field is required.
   * Default is false.
   */
  @Input() required: boolean = false;

  /**
   * Unique ID for the input element.
   */
  inputId: string = `input-${Math.random().toString(36).substring(2, 15)}`;

  today = inject(NgbCalendar).getToday();
  model: NgbDateStruct;
}
