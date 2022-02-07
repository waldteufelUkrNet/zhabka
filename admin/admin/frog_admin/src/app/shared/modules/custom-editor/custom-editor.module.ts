import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomEditorComponent} from './custom-editor.component';
import {FormsModule} from '@angular/forms';
import {IconModule} from '../icon/icon.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IconModule,
    CKEditorModule
  ],
  declarations: [CustomEditorComponent],
  exports: [CustomEditorComponent],
})
export class CustomEditorModule {
}
