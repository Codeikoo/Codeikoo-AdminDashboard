import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {
  /**
   * Label for the input field, displayed as the placeholder and translated.
   */
  @Input() label: string;

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
   * Whether to apply a pattern validator to the input field.
   * Default is false.
   */
  @Input() patternValidator: boolean = false;

  /**
   * Pattern to validate the input field against.
   */
  @Input() pattern: string | RegExp = '';

  /**
   * Minimum length for the input field value.
   * Default is -1 (no minimum length).
   */
  @Input() minLength: number = -1;

  /**
   * Unique ID for the input element.
   */
  inputId: string = `input-${Math.random().toString(36).substring(2, 15)}`;

  ngOnInit(): void {}

  /**
   * Checks if the specified form control has the specified error.
   * @param control The form control to check.
   * @param validator The type of validator to check for (e.g., 'required', 'email').
   * @returns True if the form control has the specified error and has been touched.
   */
  checkFormControlError(
    control: FormControl,
    validator: 'required' | 'email' | 'pattern' | 'minlength'
  ): boolean {
    return (control.touched && control.hasError(validator)) ?? true;
  }
}
