import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, AfterContentChecked {
  /**
   * Label for the input field, displayed as the placeholder and translated.
   */
  @Input() label: string;

  /**
   * FormControl instance to bind the input field to form control.
   */
  @Input() control: FormControl | any;

  /**
   * Type of the input field (e.g., text, password, email).
   * Default is 'text'.
   */
  @Input() type: string = 'text';

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
   * mode for the input field keyboard.
   * Default is text.
   */
  @Input() inputMode: string = 'text';

  @Input() minValue: number | null = null;
  @Input() maxValue: number | null = null;

  /**
   * Unique ID for the input element.
   */
  inputId: string = `input-${Math.random().toString(36).substring(2, 15)}`;

  isPasswordField: boolean = false;
  showPassword: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.handlePasswordInput();
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

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

  /**
   * Determines if the input field is of type password and sets the isPasswordField flag accordingly.
   */
  handlePasswordInput(): void {
    this.isPasswordField = this.type === 'password' ? true : false;
  }

  /**
   * Toggles the visibility of the password in the input field.
   * Changes the input type between 'text' and 'password'.
   */
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }
}
