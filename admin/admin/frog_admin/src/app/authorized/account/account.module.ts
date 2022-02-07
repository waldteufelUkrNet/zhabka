import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import {PipesModule} from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        NgbDropdownModule,
        PipesModule,
        FormsModule
    ],
    declarations: [AccountComponent, ProfileComponent],
})
export class AccountModule {}
