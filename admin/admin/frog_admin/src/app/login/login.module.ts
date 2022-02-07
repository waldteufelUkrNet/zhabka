import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {PipesModule, CustomInputModule} from '../shared';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    PipesModule,
    CustomInputModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
