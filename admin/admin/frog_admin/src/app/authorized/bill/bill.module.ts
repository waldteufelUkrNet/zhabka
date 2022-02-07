import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BillComponent} from './bill.component';
import {PipesModule, CustomInputModule, PaginationModule, CustomInputFilesLogoModule, CustomAutocompleteModule, CustomInputFilesModule, CustomSelectModule} from '../../shared';
import {BillRoutingModule} from './bill-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    PipesModule,
    FormsModule,
    BillRoutingModule,
    CustomInputModule,
    PaginationModule,
    CustomInputFilesModule,
    CustomSelectModule,
    CustomInputFilesLogoModule,
    CustomAutocompleteModule
  ],
  declarations: [BillComponent]
})
export class BillModule {
}
