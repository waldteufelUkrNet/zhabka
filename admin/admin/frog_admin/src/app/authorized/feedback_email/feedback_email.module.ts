import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {FeedbackEmailComponent} from './feedback_email.component';
import {PipesModule, CustomInputModule, PaginationModule, CustomInputFilesLogoModule, CustomAutocompleteModule, CustomInputFilesModule, CustomSelectModule} from '../../shared';
import {FeedbackEmailRoutingModule} from './feedback_email-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    PipesModule,
    FormsModule,
    FeedbackEmailRoutingModule,
    CustomInputModule,
    PaginationModule,
    CustomInputFilesModule,
    CustomSelectModule,
    CustomInputFilesLogoModule,
    CustomAutocompleteModule
  ],
  declarations: [FeedbackEmailComponent]
})
export class FeedbackEmailModule {
}
