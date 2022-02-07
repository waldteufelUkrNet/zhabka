import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomSelectComponent} from './custom-select.component';
import {FormsModule} from '@angular/forms';
import {IconModule} from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IconModule
  ],
  declarations: [CustomSelectComponent],
  exports: [CustomSelectComponent],
})
export class CustomSelectModule {
}
