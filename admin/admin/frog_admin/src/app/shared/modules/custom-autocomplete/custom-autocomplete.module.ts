import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomAutocompleteComponent} from './custom-autocomplete.component';
import {FormsModule} from '@angular/forms';
import {IconModule} from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IconModule
  ],
  declarations: [CustomAutocompleteComponent],
  exports: [CustomAutocompleteComponent],
})
export class CustomAutocompleteModule {
}
