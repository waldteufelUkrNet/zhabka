import {Component, SimpleChanges, OnChanges, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import {ValidationService, NavView, HandleClick } from "../../services";

@Component({
  selector: 'app-custom-autocomplete-address',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './custom-autocomplete-address.component.html',
  styleUrls: ['./custom-autocomplete-address.component.scss']
})
export class CustomAutocompleteAddressComponent extends HandleClick implements OnInit, OnChanges {
  @Input() view: NavView;

  @Input() service;
  @Input() value;
  @Input() city_id;
  @Input() key;
  @Input() street;
  @Input() findParameters;
  @Input() show = 'name';
  @Input() placeholder = '';
  @Input() startOptions;
  @Input() label;
  @Input() showError = false;
  @Output() change = new EventEmitter();
  @Input() error = false;
  @Input() is_street = false;

  options = [];
  showValue;
  currentValue;
  isPlaceholder = true;
  valid = {
    status: true,
    message: ''
  };
  showOptions;
  searchTimeout;

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
    if (this.value) {
      this.currentValue = this.value;
      this.isPlaceholder = false;
      this.showValue = this.value[this.show];
    }
   
      
    this.refreshOptions(true);

    this.valid = this.validator.checkOption(this.currentValue, this.options);

    let is_valid = false;
    if(this.currentValue && this.currentValue.id)
     is_valid = true;

    setTimeout(() => {
      this.change.emit({
        setval: true,
        value: this.currentValue,
        valid: is_valid ? is_valid : (this.valid && this.valid.status)
      });
    });
  }

  toggleOptions(inputClick = false) {
    if(!inputClick)
      this.view.isView = !this.view.isView;
    else
      this.view.isView = true;
    
    let is_valid = false;
    if(this.currentValue && this.currentValue.id)
     is_valid = true;

      this.change.emit({
        setval: true,
        value: this.currentValue || null,
        valid: false
      });
  }

  setOption(option){
    this.error = false;
    this.showValue = option[this.show];
    this.isPlaceholder = false;
    this.currentValue = this.key ? option[this.key] : option;
    this.valid = this.validator.checkOption(this.currentValue, this.options);
    this.toggleOptions();
    this.change.emit({
      setval: true,
      value: this.currentValue,
      valid: true
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['value'] || changes['value'] === null){
      const chng = changes['value'];
      if(chng.currentValue && (chng.currentValue.id || chng.currentValue.name) ){
        this.currentValue = chng.currentValue;
        this.showValue = this.currentValue['name'];
        console.log("this.showValue  ",this.showValue )
      }
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
     console.log(`'value': currentValue = ${cur}, previousValue = ${prev}`);
  
    }
     
  }

  refreshOptions(init = false){
    if(init && this.startOptions){
      this.showOptions = this.startOptions;

      for(let i=0;i<this.showOptions.length;i++){
        if(this.showOptions[i][this.key] === this.currentValue)
          this.showValue = this.showOptions[i][this.show];
      }
    } else {
      let search = this.showValue || 'hhj';
      let params = this.findParameters || {};
      params.search = search;
      console.log("street ",this.street)
      if(this.street)
        search = this.street.name + ','+search;
      
      console.log(this.city_id)
      this.service['autocomplete'](search, this.city_id, params)
        .then(optList => {
          this.showOptions = optList;
        });
    }
  }

  search(){
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.refreshOptions()
    }, 1000)
  }

}
