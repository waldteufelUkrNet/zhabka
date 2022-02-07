import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import {OwlDateTimeIntl} from 'ng-pick-datetime';
import {ValidationService} from "../../services";

export class RuIntl extends OwlDateTimeIntl {
  upSecondLabel = 'добавить секунду';
  downSecondLabel = 'меньше секунды';
  upMinuteLabel = 'добавить минуту';
  downMinuteLabel = 'меньше минуты';
  upHourLabel = 'добавить час';
  downHourLabel = 'меньше часа';
  prevMonthLabel = 'предыдущий месяц';
  nextMonthLabel = 'в следующем месяце';
  prevYearLabel = 'в прошлом году';
  nextYearLabel = 'в следующем году';
  prevMultiYearLabel = 'Предыдущие 21 год';
  nextMultiYearLabel = 'Следующие 21 год';
  switchToMonthViewLabel = 'Изменить на месяц';
  switchToMultiYearViewLabel = 'Выберите месяц и год';
  cancelBtnLabel = 'Отменить';
  setBtnLabel = 'Подтвердить';
  rangeFromLabel = 'От';
  rangeToLabel = 'До';
  hour12AMLabel = 'AM';
  hour12PMLabel = 'PM';
}

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    {provide: OwlDateTimeIntl, useClass: RuIntl},
  ],
})
export class DateTimePickerComponent implements OnInit {
  @Input() minView = "minute";
  @Input() step = '5';
  @Input() picker_type;
  @Input() value;
  @Input() placeholder = '';
  @Input() showError = false;
  @Input() required = true;
  @Output() change = new EventEmitter();

  retval;
  selectedDateTime;
  selectedTimer;
  selectedCalendar;
  valid = {
    status: true,
    message: ''
  };

  constructor(
    private validator: ValidationService
  ) {
  }

  ngOnInit() {
    if (!this.picker_type) {
      if (this.value) {
        this.value = moment(this.value).format('YYYY-MM-DD HH:mm:ss');
        this.retval = moment(this.value).format('YYYY-MM-DD HH:mm:ss');
        this.selectedDateTime = new Date(this.value);
      }
      setTimeout(() => {
        this.setOutputDateTime();
      });
    }

    if (this.picker_type === 'timer') {
      if (this.value) {
        this.value = moment(this.value).format('YYYY-MM-DD ') + this.value + ':00';
        this.retval = moment(this.value).format('HH:mm');
        this.selectedTimer = new Date(this.value);
      }
      setTimeout(() => {
        this.setOutputTimer();
      });
    }

    if (this.picker_type === 'calendar') {
      if (this.value) {
        this.value = moment(this.value).format('YYYY-MM-DD');
        this.retval = moment(this.value).format('YYYY-MM-DD');
        this.selectedCalendar = new Date(this.value);
      }
      setTimeout(() => {
        this.setOutputCalendar();
      });
    }
  }

  setOutputDateTime() {
    this.retval = this.selectedDateTime && this.selectedDateTime !== '' ? moment(this.selectedDateTime).format('YYYY-MM-DD HH:mm:ss'): null;
    this.valid = this.validator.checkDateTime(this.selectedDateTime, 'date', this.required);

    this.change.emit({
      setval: true,
      value: this.retval,
      valid: this.valid
    });
  }

  setOutputCalendar() {
    this.retval = this.selectedCalendar && this.selectedCalendar !== '' ? moment(this.selectedCalendar).format('YYYY-MM-DD') : null;
    this.valid = this.validator.checkDateTime(this.selectedCalendar, 'date', this.required);

    this.change.emit({
      setval: true,
      value: this.retval,
      valid: this.valid
    });
  }


  setOutputTimer() {
    this.retval = this.selectedTimer && this.selectedTimer !== '' ? moment(this.selectedTimer).format('HH:mm'): null;
    this.valid = this.validator.checkDateTime(this.selectedTimer, 'date', this.required);
    this.change.emit({
      setval: true,
      value: this.retval,
      valid: this.valid
    });
  }
}
