import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomInputFilesComponent} from './custom-input-files.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [CustomInputFilesComponent],
  exports: [CustomInputFilesComponent],
})
export class CustomInputFilesModule {
}
