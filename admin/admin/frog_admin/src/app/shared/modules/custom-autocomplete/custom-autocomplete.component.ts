import {Component, SimpleChanges, OnChanges, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import {ValidationService, NavView, HandleClick } from "../../services";

@Component({
  selector: 'app-custom-autocomplete',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './custom-autocomplete.component.html',
  styleUrls: ['./custom-autocomplete.component.scss']
})
export class CustomAutocompleteComponent extends HandleClick implements OnInit {
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

  ngOnChanges(changes: SimpleChanges) {
    console.log("got input", changes)
    if(changes['value'] &&  changes['value'].currentValue=== null){
      this.showValue = ''
    }

    if(changes['value'] && this.show === 'edrpou-inn')
    {
      const chng = changes['value'];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      this.currentValue = chng.currentValue;
      this.showValue = chng.currentValue ? chng.currentValue['fullName'] : "";
     console.log(`'value': currentValue = ${cur}, previousValue = ${prev}`);
    }
     
    else
    if(changes['value'] && this.show !== 'tidmid')
    {
      const chng = changes['value'];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      this.currentValue = chng.currentValue;
      this.showValue = chng.currentValue ? chng.currentValue['name'] : "";
     console.log(`'value': currentValue = ${cur}, previousValue = ${prev}`);
    }

  }

  ngOnInit() {
    if (this.value) {
      this.currentValue = this.value;
      this.isPlaceholder = false;
      if(this.show === 'tidmid')
        this.showValue = this.value['terminal_id']+'/'+this.value['merchant_id'];
      else if(this.show === 'mcc_codes')
        this.showValue = this.value['unique_id']+' / '+this.value['name'];
      else if(this.show === 'edrpou-inn'){
          let tmp_text = "";
          tmp_text = this.value['edrpou'] ? (tmp_text + this.value['edrpou'] +" / ") : tmp_text;
          tmp_text = this.value['inn'] ? (tmp_text + this.value['inn'] +" / ") : tmp_text;
          tmp_text = this.value['fullName'] ? (tmp_text + this.value['fullName']) : tmp_text;
          this.showValue = tmp_text;
        }  
      else
        this.showValue = this.value[this.show];
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
    console.log(option)
    this.error = false;
    
    if(this.show === 'tidmid')
        this.showValue = option['terminal_id']+' / '+option['merchant_id'];
    else if(this.show === 'mcc_codes')
        this.showValue =  option['unique_id']+' / '+option['name'];
    else if(this.show === 'edrpou-inn'){
      let tmp_text = "";
      tmp_text = option['edrpou'] ? (tmp_text + option['edrpou'] +" / ") : tmp_text;
      tmp_text = option['inn'] ? (tmp_text + option['inn'] +" / ") : tmp_text;
      tmp_text = option['fullName'] ? (tmp_text + option['fullName']) : tmp_text;
      this.showValue = tmp_text;
    }    
    else if(this.show === 'cityregion')
        this.showValue = option['name'];
    else
        this.showValue = option[this.show];
    //this.showValue = option[this.show];
    this.isPlaceholder = false;
    this.currentValue = this.key ? option[this.key] : option;
    this.valid = this.validator.checkOption(this.currentValue, this.options);
    this.toggleOptions();
    setTimeout(() => {
      console.log("sending ",this.currentValue)
      this.change.emit({
        setval: true,
        value: this.currentValue,
        valid: this.valid && this.valid.status
      });
    });
  }

  refreshOptions(init = false){
    if(init && this.startOptions){
      this.showOptions = this.startOptions;
      console.log(this.currentValue)
      for(let i=0;i<this.showOptions.length;i++){
        if(this.showOptions[i][this.key] === this.currentValue){
          if(this.show === 'tidmid')
            this.showValue = this.showOptions[i]['terminal_id']+' / '+this.showOptions[i]['merchant_id'];
          else if(this.show === 'mcc_codes')
            this.showValue =  this.showOptions[i]['unique_id']+' / '+this.showOptions[i]['name'];
          else if(this.show === 'edrpou-inn'){
              let tmp_text = "";
              tmp_text = this.showOptions[i]['edrpou'] ? (tmp_text + this.showOptions[i]['edrpou'] +" / ") : tmp_text;
              tmp_text = this.showOptions[i]['inn'] ? (tmp_text + this.showOptions[i]['inn'] +" / ") : tmp_text;
              tmp_text = this.showOptions[i]['fullName'] ? (tmp_text + this.showOptions[i]['fullName']) : tmp_text;
              this.showValue = tmp_text;
            }   
          else if(this.show === 'cityregion')
            this.showValue = this.showOptions[i]['name']+' ('+this.showOptions[i]['region']['name']+')';
          else
            this.showValue = this.showOptions[i][this.show];
        }
      }
    } else {
      let search = this.showValue || '';
      let params = this.findParameters || {};
      params.search = search;
      this.service['autocomplete'](search, params)
        .then(optList => {
          this.showOptions = optList;
        });
    }
  }

  getOptionShow(item){
    if(this.show === 'tidmid')
      return item['terminal_id']+' / '+item['merchant_id'];
    else if(this.show === 'mcc_codes')
      return item['unique_id']+' / '+item['name'];
    else if(this.show === 'edrpou-inn'){
        let tmp_text = "";
        tmp_text = item['edrpou'] ? (tmp_text + item['edrpou'] +" / ") : tmp_text;
        tmp_text = item['inn'] ? (tmp_text + item['inn'] +" / ") : tmp_text;
        tmp_text = item['fullName'] ? (tmp_text + item['fullName']) : tmp_text;
        return tmp_text;
    }   
    else if(this.show === 'cityregion')
      return  item['name'];
    else
      return item[this.show];
  }
  search(){
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.refreshOptions()
    }, 2000)
  }

}
