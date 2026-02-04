import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentLoaderComponent } from './content-loader/content-loader.component';
import { FullScreenLoaderComponent } from './full-screen-loader/full-screen-loader.component';
import { TranslateModule } from '@ngx-translate/core';

const components = [ContentLoaderComponent, FullScreenLoaderComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, TranslateModule],
  exports: [...components],
})
export class LoaderModule {}
