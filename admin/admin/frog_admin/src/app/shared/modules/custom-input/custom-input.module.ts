import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomInputComponent} from './custom-input.component';
import {FormsModule} from '@angular/forms';
import {IconModule} from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IconModule
  ],
  declarations: [CustomInputComponent],
  exports: [CustomInputComponent],
})
export class CustomInputModule {
}
