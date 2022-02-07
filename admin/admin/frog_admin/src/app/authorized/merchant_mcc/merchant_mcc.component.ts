import {Component, OnInit} from '@angular/core';
import {MerchantMccService, KeyboardMccLibService, KeyboardMerchantService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-merchant-mcc',
  templateUrl: './merchant_mcc.component.html',
  styleUrls: ['./merchant_mcc.component.scss'],
  providers: [MerchantMccService, KeyboardMccLibService, KeyboardMerchantService]
})
export class MerchantMccComponent implements OnInit {
  search = '';
  searchTimeout;
  list;
  countList;

  mcc_list;
  new_mcc;
  item_mcc_list;
  toDelete;
  bad_brands_only;

  show_fields_errors;
  field_errors;
  item_contact_list;
  new_contact_phone;
  new_contact_type;
  new_contact_title;
  new_contact_lat;
  new_contact_lon;

  countShowInPage = 10;
  range = {
    offset: 0,
    limit: this.countShowInPage
  };

  openedBrand;

  constructor(
    private merchantMccService: MerchantMccService,
    private mccService: KeyboardMccLibService,
    private merchantService: KeyboardMerchantService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.bad_brands_only = false;
    this.refreshlist();
    this.show_fields_errors = false;
    this.field_errors = "";
  }




  refreshlist(reinit = true){
    if(reinit){
      this.range.offset = 0;
    }

    let options = {
      range: this.range,
      search: this.search,
    };

    this.merchantMccService.getList(options)
      .then((mList: any) => {
        if(reinit) {
          this.countList = 0;
          this.range.offset = 0;
          this.merchantMccService.getCountList({search: options.search})
            .then(countData => {
              this.countList = countData;
            })
        }
        this.list = mList;
      })
  }

  getPaymentStatus(item){
    let status = item.payment_status;
    if(!item.summ)
      return 'В процессе создания (1)'

    switch (status){
      case 1:
        return 'Создан (1)'
      case 2:
        return 'Просмотрен (1)'
      case 3:
        return 'Обрабатывается (3)'
      case 4:
        return 'Отменен\\ошибка (4)'
      case 5:
        return 'Оплачен (5)'
      case 9:
        return 'Отменен\\ошибка (1)'
    }
  }
  
  setSearchValue(event){
    if(event.setval){
      this.search = event.value;

      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.refreshlist();
      }, 1000)
    }
  }

  formatDate(date){
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }

  getUserStatus(status){
    if(status === 0 || status === false){
      return 'Активен'
    }
    return 'Заблокирован'
  }



  setInputValue(event, name){
    if(event.setval){
      this.new_mcc[name] = event.value;
    }
  }

  setGlobalValue(event, name){
    if(event.setval){
        this[name] = event.value;
    }
  }

  openForm(content, item = null){
    this.show_fields_errors = false;
    this.field_errors = "";
    this.openedBrand = item || null;
    this.modalService.open(content);
  }

  openCreateForm(content){
    this.new_mcc = {
      merchant_id: '',
      mcc_code: '',
      inn_edrpou: ''
    };
    this.modalService.open(content);
  }

  checkChanges(){
    console.log(this.new_mcc)
    if(!this.new_mcc.merchant_id || !this.new_mcc.inn_edrpou || !this.new_mcc.mcc_code)
      return false;

     return true;
  }


  saveChanges(){
    if(!this.new_mcc.merchant_id || !this.new_mcc.inn_edrpou || !this.new_mcc.mcc_code)
      return;

      this.merchantMccService.add(this.new_mcc)
      .then((data: any) => {
        console.log('data ',data)
        if(data.error){
          if(data.error === 'NO_SUCH_MCC')
            alert('МСС отсутсвтует в Базе данных')
          else if(data.error === 'NO_SUCH_MERCHANT')
          alert('Мерчант отсутсвтует в Базе данных')
          else if(data.error === 'MERCHANT_IS_NOT_TRIAL')
          alert('Мерчант не ограниченный')
          else if(data.error === 'ALREADY_EXISTS')
          alert('Разрешение уже выдано')
          return;
        }
        this.refreshlist();
        this.modalService.dismissAll();
      })
  }

  pageChanged(event){
    this.range.offset = (event - 1) * this.countShowInPage;
    this.refreshlist(false);
  }

  openDeleteForm(content, item){
    this.toDelete = item;
    this.modalService.open(content);
  }

  closeDelete(){
    this.toDelete = null;
    this.modalService.dismissAll();
  }

  deleteToken(){
    this.merchantMccService.delete({id: this.toDelete.id})
      .then(upData => {
        this.toDelete = null;
        this.modalService.dismissAll();
        this.refreshlist();
      });
  }

}
