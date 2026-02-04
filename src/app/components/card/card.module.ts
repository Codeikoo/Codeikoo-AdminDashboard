import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { BrokenImageDirective } from 'src/app/directives/broken images/broken-image.directive';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, TranslateModule, RouterModule, BrokenImageDirective],
  exports: [CardComponent],
})
export class CardModule {}
