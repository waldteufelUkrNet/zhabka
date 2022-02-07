import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {AuthorizedRoutingModule} from './authorized-routing.module';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {AuthorizedComponent} from './authorized.component';
import {PipesModule, DateTimePickerModule} from '../shared'

@NgModule({
  imports: [
    CommonModule,
    AuthorizedRoutingModule,
    NgbDropdownModule,
    PipesModule,
    DateTimePickerModule
  ],
  declarations: [AuthorizedComponent, SidebarComponent, HeaderComponent],
})
export class AuthorizedModule {
}
