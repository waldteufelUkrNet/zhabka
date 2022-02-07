import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DashboardComponent} from './dashboard.component';
import {PipesModule, CustomInputModule, PaginationModule, CustomInputFilesModule, CustomSelectModule, CustomAutocompleteModule} from '../../shared';
import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    PipesModule,
    FormsModule,
    DashboardRoutingModule,
    CustomInputModule,
    PaginationModule,
    CustomInputFilesModule,
    CustomSelectModule,
    CustomAutocompleteModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
