import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {P2pPayoutLogsComponent} from './p2p_payout_logs.component';
import {PipesModule, CustomInputModule, PaginationModule, CustomInputFilesLogoModule, CustomAutocompleteModule, CustomInputFilesModule, CustomSelectModule} from '../../shared';
import {P2pPayoutLogsRoutingModule} from './p2p_payout_logs-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    PipesModule,
    FormsModule,
    P2pPayoutLogsRoutingModule,
    CustomInputModule,
    PaginationModule,
    CustomInputFilesModule,
    CustomSelectModule,
    CustomInputFilesLogoModule,
    CustomAutocompleteModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  declarations: [P2pPayoutLogsComponent]
})
export class P2pPayoutLogsModule {
}
