import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MerchantComponent} from './merchant.component';
import {PipesModule, CustomInputModule, PaginationModule, CustomInputFilesLogoModule, CustomAutocompleteModule, CustomInputFilesModule, CustomSelectModule} from '../../shared';
import {MerchantRoutingModule} from './merchant-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    PipesModule,
    FormsModule,
    MerchantRoutingModule,
    CustomInputModule,
    PaginationModule,
    CustomInputFilesModule,
    CustomSelectModule,
    CustomInputFilesLogoModule,
    CustomAutocompleteModule
  ],
  declarations: [MerchantComponent]
})
export class MerchantModule {
}
