import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemLogsComponent } from './item-logs.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderModule } from '../loader/loader.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ItemLogsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    LoaderModule,
    RouterModule,
  ],
  exports: [ItemLogsComponent],
})
export class ItemLogsModule {}
