import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {LoaderComponent} from './loader.component';
import {LoaderRoutingModule} from './loader-routing.module';
import {FormsModule} from '@angular/forms';
import {IconModule} from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    LoaderRoutingModule,
    IconModule
  ],
  declarations: [LoaderComponent],
  exports: [ LoaderComponent ]
})
export class LoaderModule {
}
