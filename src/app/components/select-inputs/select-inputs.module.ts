import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormalSelectComponent } from './normal-select/normal-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptgroupSelectComponent } from './optgroup-select/optgroup-select.component';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { CheckboxesMultiSelectComponent } from './checkboxes-multi-select/checkboxes-multi-select.component';

const components = [
  NormalSelectComponent,
  OptgroupSelectComponent,
  CheckboxesMultiSelectComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    NgSelectModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptionHighlightModule,
  ],
  exports: [...components],
})
export class SelectInputsModule {}
