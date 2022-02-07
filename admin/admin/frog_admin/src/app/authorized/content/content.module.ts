import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ContentComponent} from './content.component';
import {PipesModule, CustomInputModule, PaginationModule, CustomInputFilesModule, CustomSelectModule, CustomEditorModule} from '../../shared';
import {ContentRoutingModule} from './content-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    PipesModule,
    FormsModule,
    ContentRoutingModule,
    CustomInputModule,
    PaginationModule,
    CustomInputFilesModule,
    CustomSelectModule,
    CustomEditorModule
  ],
  declarations: [ContentComponent]
})
export class ContentModule {
}
