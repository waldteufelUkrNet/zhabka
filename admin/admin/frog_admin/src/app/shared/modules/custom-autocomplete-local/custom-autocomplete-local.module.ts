import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomAutocompleteLocalComponent} from './custom-autocomplete-local.component';
import {FormsModule} from '@angular/forms';
import {IconModule} from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IconModule
  ],
  declarations: [CustomAutocompleteLocalComponent],
  exports: [CustomAutocompleteLocalComponent],
})
export class CustomAutocompleteLocalModule {
}
