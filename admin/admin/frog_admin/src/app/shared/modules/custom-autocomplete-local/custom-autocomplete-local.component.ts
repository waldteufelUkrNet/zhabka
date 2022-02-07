import {Component, OnInit, AfterViewInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import {ValidationService, NavView, HandleClick } from "../../services";

@Component({
  selector: 'app-custom-autocomplete-local',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './custom-autocomplete-local.component.html',
  styleUrls: ['./custom-autocomplete-local.component.scss']
})
export class CustomAutocompleteLocalComponent extends HandleClick implements OnInit, AfterViewInit {
  @Input() view: NavView;

  @Input() service;
  @Input() value;
  @Input() key;
  @Input() findParameters;
  @Input() show = 'name';
  @Input() search_list = [];
  @Input() placeholder = '';
  @Input() startOptions;
  @Input() label;
  @Input() showError = false;
  @Output() change = new EventEmitter();
  @Input() error = false;

  @ViewChild('autocompl')
  autocompl: ElementRef;

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
  ngAfterViewInit() {
    this.autocompl.nativeElement.focus();
  }
  ngOnInit() {
    if (this.value) {
      this.currentValue = this.value.name;
      this.isPlaceholder = false;
      this.showValue = this.value[this.show];
    }
   else{
    setTimeout(() => {
      this.autocompl.nativeElement.focus();
    }, 1000)
    
   }
    

    this.refreshOptions(true);

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
  }

  setOption(option){
    this.error = false;
    this.showValue = option[this.show];
    this.isPlaceholder = false;
    this.currentValue = option;
    this.valid = this.validator.checkOption(this.currentValue, this.options);
    this.toggleOptions();
    console.log(this.currentValue)
    this.change.emit({
      setval: true,
      value: this.currentValue,
      valid: this.valid && this.valid.status
    });
  }

  refreshOptions(init = false){
    if(init && this.startOptions){
      this.showOptions = this.startOptions;

      for(let i=0;i<this.showOptions.length;i++){
        if(this.showOptions[i][this.key] === this.currentValue)
          this.showValue = this.showOptions[i][this.show];
      }
    } else {
      let search = this.showValue || '';
      let params = this.findParameters || {};
      params.search = search;

      this.showOptions = [];
      
      console.log('searching in ',this.search_list.length)

      if(search){
        search = search.toLowerCase().trim();
        this.search_list.map((elem) => {
          //console.log('searching in '+elem.name+ " " +search)
          //if(elem.name.includes(search))
          if(elem.name.toLowerCase().indexOf(search)===0){
            //console.log()
            this.showOptions.push(elem)
          }
            
        });
      }
      

      this.change.emit({
        setval: true,
        value: {id: null, name: '', region:{id: null, name: ''}},
        valid: this.valid && this.valid.status
      });

      console.log('found '+this.showOptions.length)
      /*this.service['autocomplete'](search, params)
        .then(optList => {
          this.showOptions = optList;
        });*/
    }
  }

  checkOne(substr, value){
    if(value.includes(substr)){
      console.log('true ')
      return true;
    } else{
      return false;
    }
  }

  search(){
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.refreshOptions()
    }, 1000)
  }

}
