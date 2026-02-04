import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language/language.service';

/**
 * Component: NormalSelectComponent
 *
 * A reusable and dynamic select dropdown component built with `ng-select`.
 * This component supports single and multi-select modes, and can dynamically add a "Select All" option when `multiple` is enabled.
 * It also handles internationalization (i18n) by automatically translating item labels.
 *
 * The component listens to language changes and updates dropdown options accordingly.
 *
 * ## Features:
 * - Supports single and multi-select modes.
 * - Option to add "Select All" for multi-select.
 * - Fully customizable via inputs (`items`, `bindLabel`, `bindValue`).
 * - Reactive form compatible with `FormControl`.
 * - Emits selected values through `selectedItemsChange` output.
 */
@Component({
  selector: 'app-normal-select',
  templateUrl: './normal-select.component.html',
  styleUrls: ['./normal-select.component.scss'],
})
export class NormalSelectComponent implements OnInit, OnDestroy {
  // Inject necessary services
  private translateService = inject(TranslateService);
  private languageService = inject(LanguageService);

  /**
   * FormControl instance that binds the select input to the form.
   * This enables reactive form validation and data binding.
   */
  @Input() control: FormControl | any;

  /**
   * Items to populate the select dropdown.
   * Each item should have an `id` and `name` field.
   * Example: [{ id: '1', name: 'Option 1' }, { id: '2', name: 'Option 2' }]
   */
  @Input() items: { id: string; name: string }[] = [];

  /**
   * The field from `items` to be used as the label in the dropdown.
   * Default: 'name'.
   */
  @Input() bindLabel: string = 'name';

  /**
   * The field from `items` to be used as the value.
   * Default: 'id'.
   */
  @Input() bindValue: string = 'id';

  /**
   * If true, the select input is marked as required.
   * Shows an error message when the form is submitted without a value.
   */
  @Input() required: boolean = false;

  /**
   * The label for the select input, used as a placeholder.
   * This label is automatically translated if internationalization is enabled.
   */
  @Input() label: string;

  /**
   * Enables multi-select mode if set to true.
   * Default: false (single-select mode).
   */
  @Input() multiple: boolean = false;

  /**
   * Event emitter that outputs the selected item(s) whenever the selection changes.
   * - For single-select, emits the selected `id`.
   * - For multi-select, emits an array of selected `ids`.
   */
  @Output() selectedItemsChange = new EventEmitter<any>();

  /**
   * Subscription to handle observable cleanup on component destruction.
   */
  subscriptions: Subscription = new Subscription();

  /**
   * Items used in the dropdown, including "Select All" if `multiple` is true.
   */
  multiSelectItems: { id: string; name: string }[] = [];

  /**
   * Lifecycle hook: ngOnInit
   * Called once the component is initialized.
   * - Populates and translates items.
   * - Subscribes to language changes to dynamically update dropdown labels.
   */
  ngOnInit(): void {
    this.updateItemsLanguage();

    // Watch for language changes and update items accordingly
    this.subscriptions.add(
      this.languageService.watchCurrentLanguage().subscribe(() => {
        this.updateItemsLanguage();
      })
    );
  }

  /**
   * Updates the dropdown items with translated labels.
   * If multi-select is enabled, a "Select All" option is added at the top.
   */
  private updateItemsLanguage(): void {
    // Translate each item in the dropdown
    this.multiSelectItems = this.items.map((item) => ({
      id: item['id'],
      name: this.translateService.instant(item['name']),
    }));

    // Add "Select All" for multi-select dropdowns
    if (this.multiple) {
      const selectAllLabel = this.translateService.instant('select_all');
      this.multiSelectItems.unshift({ id: 'Select All', name: selectAllLabel });
    }
  }

  /**
   * Handles selection change in the dropdown.
   * - For single-select, directly emits the selected item.
   * - For multi-select, checks if "Select All" was chosen and selects all items accordingly.
   *
   * @param selectedValues - Selected item(s) from the dropdown.
   */
  onMultiSelectChange(selectedValues: any): void {
    if (!this.multiple) {
      this.selectedItemsChange.emit(selectedValues);
      return;
    }

    // Check if "Select All" was selected
    const isSelectAllSelected = selectedValues.some(
      (item: any) => item.id === 'Select All'
    );

    // If "Select All" is selected, select all item IDs
    if (isSelectAllSelected) {
      const allItemIds = this.items.map((item) => item.id);
      this.control.setValue(allItemIds); // Programmatically select all
      this.selectedItemsChange.emit(allItemIds);
    } else {
      // Otherwise, emit the selected values
      this.selectedItemsChange.emit(selectedValues);
    }
  }

  /**
   * Lifecycle hook: ngOnDestroy
   * Called when the component is destroyed.
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
