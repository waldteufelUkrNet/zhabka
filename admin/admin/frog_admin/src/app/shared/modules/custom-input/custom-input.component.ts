import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {ValidationService} from '../../services';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {
  // @Input() value;
  @Input() set value(_val){
    this.currentValue = _val ? _val : this.type === 'check' ? false : '';
    this.ref.detectChanges();
  }
  @Input() label;
  @Input() min = 0.1;
  @Input() max = 1000000000;
  @Input() step = 0.1;
  @Input() discharge = false;
  @Input() placeholder;
  @Input() validatorType;
  @Input() required = true;
  @Input() showError = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() invalidMessage = '';
  @Input() type = 'text';
  @Output() change = new EventEmitter();

  // to delete
  @Input() topLabel = false;
  @Input() styleLabel;
  @Input() styleBlock;
  @Input() icon;
  @Input() error = false;
  // end delete

  currentValue;
  valid = {
    status: true,
    message: ''
  };

  constructor(
    private validator: ValidationService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    // this.currentValue = this.value ? this.value : this.type === 'check' ? false : '';

    if(this.discharge)
      this.currentValue = this.dischargeVal(this.currentValue);

    if(this.invalid){
      this.valid = {
        status: false,
        message: this.invalidMessage
      };
    } else {
      if(this.validatorType)
        this.valid = this.validator[this.validatorType](this.currentValue, this.required);

      if(this.valid && this.type === 'number'){
        if(this.currentValue && (this.currentValue < this.min || this.currentValue > this.max)){
          this.valid = {
            status: false,
            message: 'Введите значения больше ' + this.min + ' и меньше ' + this.max
          };
        }
      }
    }

    setTimeout(() => {
      this.changed();
    });

  }

  changed(){
    if(this.discharge)
      this.currentValue = this.dischargeVal(this.currentValue);

    let validateValue = this.discharge ? this.clearDischarge(this.currentValue) : this.currentValue;

    if(this.validatorType)
      this.valid = this.validator[this.validatorType](validateValue, this.required);

    if(this.valid && this.type === 'number'){
      if(validateValue && (parseFloat('' + validateValue) < this.min || parseFloat('' + validateValue) > this.max)){
        this.valid = {
          status: false,
          message: 'Введите значения больше ' + this.min + ' и меньше ' + this.max
        };
      }
    }

    this.change.emit(
      {
        setval: true,
        value: validateValue,
        valid: this.valid && this.valid.status
      })
  }

  setCheckVal(){
    this.currentValue = !this.currentValue;
    this.changed();
  }

  dischargeVal(val){
    val = '' + val;
    return val.replace( /\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  clearDischarge(val){
    return val.replace( /\s/g, "");
  }

}
