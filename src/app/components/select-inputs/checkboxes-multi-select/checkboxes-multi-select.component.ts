import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkboxes-multi-select',
  templateUrl: './checkboxes-multi-select.component.html',
  styleUrls: ['./checkboxes-multi-select.component.scss'],
})
export class CheckboxesMultiSelectComponent {
  /**
   * FormControl instance to bind the input field to form control.
   */
  @Input() control: FormControl | any;

  /**
   * Input: items
   *
   * Array of objects representing the options in the select dropdown.
   * Each object should contain fields for grouping, label, and value.
   */
  @Input() items: { id: string; name: string; groupName: string }[] = [];

  /**
   * Input: bindLabel
   *
   * The field in the items array to display as label.
   */
  @Input() bindLabel: string = 'name';

  /**
   * Input: bindValue
   *
   * The field in the items array to use as value.
   */
  @Input() bindValue: string = 'id';

  /**
   * Input: groupBy
   *
   * The field in the items array to group by.
   */
  @Input() groupBy: string = '';

  /**
   * Whether the input field is required.
   * Default is false.
   */
  @Input() required: boolean = false;

  /**
   * Label for the input field, displayed as the placeholder and translated.
   */
  @Input() label: string;

  /**
   * Output: selectedItemChange
   *
   * Event emitter that emits the selected item's value whenever the selection changes.
   */
  @Output() selectedItemsChange = new EventEmitter<any>();

  /**
   * Method: onSelectChange
   *
   * Emits the selected item's value on change.
   *
   * @param selectedValue - The selected item's value.
   */
  onSelectChange(selectedValue: any) {
    this.selectedItemsChange.emit(selectedValue);
  }
}
