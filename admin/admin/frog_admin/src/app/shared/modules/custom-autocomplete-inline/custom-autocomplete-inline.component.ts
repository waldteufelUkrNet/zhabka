import {Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import {ValidationService, NavView, HandleClick } from "../../services";

@Component({
  selector: 'app-custom-autocomplete-inline',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './custom-autocomplete-inline.component.html',
  styleUrls: ['./custom-autocomplete-inline.component.scss']
})
export class CustomAutocompleteInlineComponent extends HandleClick implements OnInit {
  @Input() view: NavView;

  @Input() service;
  @Input() value;
  @Input() key;
  @Input() findParameters;
  @Input() show = 'name';
  @Input() placeholder = '';
  @Input() startOptions;
  @Input() label;
  @Input() showError = false;
  @Output() change = new EventEmitter();
  @Input() error = false;

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
    if (this.value || this.value==='') {
      this.currentValue = this.value;
      this.isPlaceholder = false;
      this.showValue = this.value[this.show];
    }

    this.showValue = "";
    this.refreshOptions(true);

    //this.valid = this.validator.checkOption(this.currentValue, this.options);

    setTimeout(() => {
      this.change.emit({
        setval: true,
        value: this.currentValue ,
        valid: true
      });
    });
  }

  toggleOptions(inputClick = false) {
    if(!inputClick)
      this.view.isView = !this.view.isView;
    else
      this.view.isView = true;
  }

  setOption(option){
    this.error = false;
    this.showValue = option['name'];
    this.currentValue = option['name'];
    console.log('currentValue ',this.currentValue)
    this.isPlaceholder = false;
    
    console.log("this.currentValue",this.currentValue)
    this.toggleOptions();
    this.change.emit({
      setval: true,
      value: this.showValue,
      valid: true
    });
  }

  sendValue(){
    setTimeout(() => {
      console.log("this.showValue",this.showValue)
      this.change.emit({
        setval: true,
        value: this.showValue,
        valid: true
      });
    }, 100)
    
  }
  refreshOptions(init = false){
    
      let search = this.showValue || '';
      let params = this.findParameters || {};
      params.search = search;
      this.service['autocomplete'](search, params)
        .then(optList => {
          //this.showOptions = optList;

          this.showOptions = [];
      
            search = search.toLowerCase().trim();
            optList.map((elem) => {
              //console.log('searching in '+elem.name+ " " +search)
              //if(elem.name.includes(search))
              if(elem.name.toLowerCase().indexOf(search)===0){
                //console.log()
                this.showOptions.push(elem)
              }
                
            });
      

        });
  }

  search(){
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.refreshOptions()
    }, 1000)
  }

}
