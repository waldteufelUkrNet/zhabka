import {Component, OnInit} from '@angular/core';
import {KeyboardP2pBillsService, KeyboardPaymentDetailsService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-p2p-bill',
  templateUrl: './p2p_bill.component.html',
  styleUrls: ['./p2p_bill.component.scss'],
  providers: [KeyboardP2pBillsService, KeyboardPaymentDetailsService]
})
export class P2pBillComponent implements OnInit {
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
  contact_types = [
    {name:"Email", value:"Email"},
    {name:"Номер телефона", value:"Phone"},
    {name:"Сайт", value:"Site"},
    {name:"Координаты", value:"LatLon"},
    {name:"Адрес", value:"Address"}
  ];

  countShowInPage = 10;
  range = {
    offset: 0,
    limit: this.countShowInPage
  };

  openedBrand;
  itemSender;
  itemShows;

  constructor(
    private billsService: KeyboardP2pBillsService,
    private paymentDetailsService: KeyboardPaymentDetailsService,
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

    this.billsService.getList(options)
      .then((mList: any) => {
        if(reinit) {
          this.countList = 0;
          this.range.offset = 0;
          this.billsService.getCountList({search: options.search})
            .then(countData => {
              this.countList = countData;
            })
        }
        this.list = mList;
      })
  }

  showShows(item){
    this.paymentDetailsService.getShowsList({payment_id:item.id, payment_type: 'p2p_payment'})
    .then((mList: any) => {
      this.itemShows = mList;
    })
  }
  showSender(item){
    this.paymentDetailsService.getSender({payment_id:item.id, payment_type: 'p2p_payment'})
    .then((mList: any) => {
      this.itemSender= mList;
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
      this.openedBrand[name] = event.value;
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
    this.itemSender = null;
    this.itemShows = null;
    
    console.log(item)
    this.openedBrand = item || null;

    this.modalService.open(content);
  }

  pageChanged(event){
    this.range.offset = (event - 1) * this.countShowInPage;
    this.refreshlist(false);
  }
}
