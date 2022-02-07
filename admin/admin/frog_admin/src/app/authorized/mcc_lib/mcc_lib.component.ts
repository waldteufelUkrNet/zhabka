import {Component, OnInit} from '@angular/core';
import {KeyboardMccLibService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-mcc-lib',
  templateUrl: './mcc_lib.component.html',
  styleUrls: ['./mcc_lib.component.scss'],
  providers: [KeyboardMccLibService]
})
export class MccLibComponent implements OnInit {
  search = '';
  searchTimeout;
  list;
  countList;

  mcc_list;
  new_mcc;
  item_mcc_list;

  bad_brands_only;

  show_fields_errors;
  field_errors;
  item_contact_list;
  new_contact_phone;
  new_contact_type;
  new_contact_title;
  new_contact_lat;
  new_contact_lon;
  mcc_types = [
    {
      code: "free",
      name: "Свободный"
    },
    {
      code: "trial",
      name: "Активирован"
    },
    {
      code: "disabled",
      name: "Запрещен"
    }
  ]

  refresh = false;
  total = {
    income_balance: 0,
    outcome_balance: 0,
    comission: 0
  };
  ranges: any = {
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };

  filter = {
    daterange: {
      startDate: new Date(moment().add(-7, "days").format('YYYY-MM-DD')),
      endDate: new Date(moment().format('YYYY-MM-DD')),
    }
  };

  countShowInPage = 10;
  range = {
    offset: 0,
    limit: this.countShowInPage
  };

  openedBrand;

  constructor(
    private mccService: KeyboardMccLibService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.bad_brands_only = false;
    this.refreshStatistic();
    this.show_fields_errors = false;
    this.field_errors = "";
  }

  formatType(type){
    if(type==='free')
      return 'Свободный';
    if(type==='trial')
      return 'Активирован';
    if(type==='disabled')
      return 'Запрещен';
  }

  refreshStatistic(){
    this.refresh = true;
    this.total = null;
    this.list = [];
    this.mccService.getList(this.filter)
      .then((data: any) => {
        this.list = data.list;
        this.total = data.total;
        this.refresh = false;
      })
  }



  formatDate(date){
    return moment(date).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss');
  }


  setInputValue(event, name){
    if(event.setval){
      this.openedBrand[name] = event.value;
    }
  }

  setGlobalValue(event, name){
    if(event.setval){
        this[name] = event.value;
    }
  }

  checkChanges(item){
    console.log('ch item ',item)
    if(!item.id || !item.number || !item.description || !item.payment_purpose || !item.type)
      return false;
    else
        if(item.type === 'trial')
          if(!item.ipay_merchant_id || !item.ipay_merchant_name || !item.ipay_merchant_key || !item.ipay_system_key  ||
            !item.coefficient || !item.minimal_summ || !item.maximum_summ || !item.monthly_limit || !item.dayly_limit)
            return false;
     console.log('success')
      return true;
  }

  saveChanges(item){
   if(item.type !== 'trial'){
    item.ipay_merchant_id  = null;
    item.ipay_merchant_name  = null;
    item.ipay_merchant_key  = null;
    item.ipay_system_key  = null;
   }

   this.mccService.update(item.id, item)
      .then((data: any) => {
        this.refreshStatistic();
        this.modalService.dismissAll();
      })
    
  }

  openForm(content, item = null){
    this.show_fields_errors = false;
    this.field_errors = "";

    if(!item.coefficient)
      item.coefficient = 1;
    if(!item.minimal_summ)
      item.minimal_summ = 0;

    if(!item.maximum_summ)
      item.maximum_summ = 1;

    if(!item.monthly_limit)
      item.monthly_limit = 1;
      if(!item.dayly_limit)
      item.dayly_limit = 1;

    this.openedBrand = item || null;

    this.modalService.open(content);
  }

  pageChanged(event){
    this.range.offset = (event - 1) * this.countShowInPage;
    this.refreshStatistic();
  }
}
