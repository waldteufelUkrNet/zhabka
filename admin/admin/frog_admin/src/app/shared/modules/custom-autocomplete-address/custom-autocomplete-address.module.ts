import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomAutocompleteAddressComponent} from './custom-autocomplete-address.component';
import {FormsModule} from '@angular/forms';
import {IconModule} from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IconModule
  ],
  declarations: [CustomAutocompleteAddressComponent],
  exports: [CustomAutocompleteAddressComponent],
})
export class CustomAutocompleteAddressModule {
}
