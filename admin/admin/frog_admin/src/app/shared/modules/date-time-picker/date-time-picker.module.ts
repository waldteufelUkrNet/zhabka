import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DateTimePickerComponent } from './date-time-picker.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE} from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [DateTimePickerComponent],
    exports: [DateTimePickerComponent],
    providers: [
      {provide: OWL_DATE_TIME_LOCALE, useValue: 'ru-RU'},
    ],
})
export class DateTimePickerModule {}
