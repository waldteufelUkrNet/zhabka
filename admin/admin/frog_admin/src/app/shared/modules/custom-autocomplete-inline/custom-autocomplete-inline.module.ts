import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomAutocompleteInlineComponent} from './custom-autocomplete-inline.component';
import {FormsModule} from '@angular/forms';
import {IconModule} from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IconModule
  ],
  declarations: [CustomAutocompleteInlineComponent],
  exports: [CustomAutocompleteInlineComponent],
})
export class CustomAutocompleteInlineModule {
}
