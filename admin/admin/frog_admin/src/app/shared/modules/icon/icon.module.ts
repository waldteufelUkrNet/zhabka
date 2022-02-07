import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IconComponent} from './icon.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [IconComponent],
  exports:[IconComponent]
})
export class IconModule {
}
