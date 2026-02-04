import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from './no-data.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NoDataComponent],
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [NoDataComponent],
})
export class NoDataModule {}
