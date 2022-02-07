import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePipe, ErrorPipe, LinkPipe} from './index'

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DatePipe,
    ErrorPipe,
    LinkPipe
  ],
  declarations: [
    DatePipe,
    ErrorPipe,
    LinkPipe
  ],
  exports: [
    DatePipe,
    ErrorPipe,
    LinkPipe
  ]
})
export class PipesModule {
}
