import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgProgressbar } from 'ngx-progressbar';

// translate
import { TranslateModule } from '@ngx-translate/core';

// pagination
import { NgxPaginationModule } from 'ngx-pagination';

// owl datetime picker
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

// ng-bootstrap (استورد اللي بتستخدمه فقط)
import {
  NgbDropdownModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';

import { CustomFormsModule } from 'ngx-custom-validators';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';

import { TabsModule } from 'ngx-bootstrap/tabs';

export const SHARED_IMPORTS = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NgSelectComponent,
  TranslateModule,
  NgOptionComponent,
  RouterLink,
  NgProgressbar,
  NgxPaginationModule,

  OwlDateTimeModule,
  OwlNativeDateTimeModule,

  NgbDropdownModule,
  NgbCollapseModule,
  TabsModule,
] as const;
