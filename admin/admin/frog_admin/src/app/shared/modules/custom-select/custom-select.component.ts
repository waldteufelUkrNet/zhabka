import {Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import {ValidationService, NavView, HandleClick } from "../../services";

@Component({
  selector: 'app-custom-select',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent extends HandleClick implements OnInit {
  @Input() view: NavView;

  @Input() value = '';
  @Input() options = [];
  @Input() show = 'name';
  @Input() placeholder = '';
  @Input() label;
  @Input() showError = false;
  @Output() change = new EventEmitter();

  //to delete
  @Input() icon;
  @Input() error = false;
  //to delete

  showValue = '';
  currentValue;
  isPlaceholder = true;
  valid = {
    status: true,
    message: ''
  };
  showOptions;

  constructor(
    private validator: ValidationService,
    myElement: ElementRef
  ) {
    super(myElement);
    this.view = { isView: false };
  }

  onClick(): void {
    this.view.isView = !this.view.isView;
  }

  ngOnInit() {
    this.refreshOptions();
    if (this.value) {
      this.currentValue = this.value;
      this.isPlaceholder = false;
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].id === this.value) {
          this.showValue = this.options[i][this.show];
        }
      }
    }

    this.valid = this.validator.checkOption(this.currentValue, this.options);

    setTimeout(() => {
      this.change.emit({
        setval: true,
        value: this.currentValue,
        valid: this.valid && this.valid.status
      });
    });
  }

  toggleOptions(inputClick = false) {
    if(!inputClick)
      this.view.isView = !this.view.isView;
    else
      this.view.isView = true;

    this.refreshOptions();
  }

  setOption(option){
    this.error = false;
    this.showValue = option[this.show];
    this.isPlaceholder = false;
    this.currentValue = option.id;
    this.valid = this.validator.checkOption(this.currentValue, this.options);
    this.toggleOptions();
    this.change.emit({
      setval: true,
      value: this.currentValue,
      valid: this.valid && this.valid.status
    });
  }

  refreshOptions(keyup = false){
    this.showOptions = [];
    if(!keyup){
      for(let i=0;i<this.options.length;i++){
        this.showOptions.push(this.options[i]);
      }
    } else {
      for(let i=0;i<this.options.length;i++){
        let _itemLabel = this.options[i][this.show].toLowerCase();
        let _search = this.showValue.toLowerCase();
        if(_itemLabel.indexOf(_search) === 0){
          this.showOptions.push(this.options[i]);
        }
      }
    }
  }

}
