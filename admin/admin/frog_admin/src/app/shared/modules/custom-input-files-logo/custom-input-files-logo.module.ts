import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomInputFilesLogoComponent} from './custom-input-files-logo.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [CustomInputFilesLogoComponent],
  exports: [CustomInputFilesLogoComponent],
})
export class CustomInputFilesLogoModule {
}
