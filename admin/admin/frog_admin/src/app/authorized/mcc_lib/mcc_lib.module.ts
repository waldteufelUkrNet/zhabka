import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {MccLibComponent} from './mcc_lib.component';
import {PipesModule, CustomInputModule, PaginationModule, CustomInputFilesLogoModule, CustomAutocompleteModule, CustomInputFilesModule, CustomSelectModule} from '../../shared';
import {MccLibRoutingModule} from './mcc_lib-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    PipesModule,
    FormsModule,
    MccLibRoutingModule,
    CustomInputModule,
    PaginationModule,
    CustomInputFilesModule,
    CustomSelectModule,
    CustomInputFilesLogoModule,
    CustomAutocompleteModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  declarations: [MccLibComponent]
})
export class MccLibModule {
}
