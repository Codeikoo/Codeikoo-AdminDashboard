import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchUsersAutocompleteComponent } from './search-users-autocomplete.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrokenImageDirective } from 'src/app/directives/broken images/broken-image.directive';

@NgModule({
  declarations: [SearchUsersAutocompleteComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    BrokenImageDirective,
  ],
  exports: [SearchUsersAutocompleteComponent],
})
export class SearchUsersModule {}
