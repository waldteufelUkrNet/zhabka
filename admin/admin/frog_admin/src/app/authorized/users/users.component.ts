import {Component, OnInit} from '@angular/core';
import {KeyboardUsersService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [KeyboardUsersService]
})
export class UsersComponent implements OnInit {
  search = '';
  searchTimeout;
  list;
  countList;

  mcc_list;
  new_mcc;
  item_mcc_list;

  show_p = false;
  show_p2p = false;
  show_devices = false;

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
  userDevices;

  constructor(
    private usersService: KeyboardUsersService,
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

    this.usersService.getList(options)
      .then((mList: any) => {
        if(reinit) {
          this.countList = 0;
          this.range.offset = 0;
          this.usersService.getCountList({search: options.search})
            .then(countData => {
              this.countList = countData;
            })
        }
        this.list = mList;
      })
  }

  unblockUser(){
    if(!this.openedBrand){
      return;
    }

    let options = {
      user_id: this.openedBrand.id
    };

    this.usersService.unblockUser(options)
      .then((mList: any) => {
        this.openedBrand.is_blocked = false;
      })
  }

  blockUser(){
    if(!this.openedBrand){
      return;
    }

    let options = {
      user_id: this.openedBrand.id
    };

    this.usersService.blockUser(options)
      .then((mList: any) => {
        this.openedBrand.is_blocked = true;
      })
  }

  blockPayment(item){
    this.usersService.blockPayment({
      item_id: item.id
    })
    .then((outData: any) => {
      item.removed = true;
    })
    
  }

  unblockPayment(item){
    this.usersService.unblockPayment({
      item_id: item.id
    })
    .then((outData: any) => {
      item.removed = false;
    })
  }


  blockP2pPayment(item){
    this.usersService.blockP2pPayment({
      item_id: item.id
    })
    .then((outData: any) => {
      item.removed = true;
    })
    
  }

  unblockP2pPayment(item){
    this.usersService.unblockP2pPayment({
      item_id: item.id
    })
    .then((outData: any) => {
      item.removed = false;
    })
  }

  blockDevice(item){
    this.usersService.blockDevice({
      item_id: item.id
    })
    .then((outData: any) => {
      item.blocked = true;
    })
    
  }

  unblockDevice(item){
    this.usersService.unblockDevice({
      item_id: item.id
    })
    .then((outData: any) => {
      item.blocked = false;
    })
  }

  getPaymentStatus(status){
    switch (status){
      case 1:
        return 'Создан (1)'
      case 2:
        return 'Просмотрен (2)'
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

  getDevices(){
    this.usersService.getDevices(this.openedBrand.id)
      .then((list: any) => {
        this.userDevices = list;
      })
  }

  openForm(content, item = null){
    this.show_fields_errors = false;
    this.field_errors = "";
    this.show_p = false;
    this.show_p2p = false;
    this.show_devices = false;
    this.openedBrand = item || null;
    this.userDevices = null;
    if(this.openedBrand){
      
      this.usersService.getUserP2pList(this.openedBrand.id)
      .then((p2pList: any) => {
        this.openedBrand.p2p_payments = p2pList;
        this.modalService.open(content);
      })
    }
    
  }

  pageChanged(event){
    this.range.offset = (event - 1) * this.countShowInPage;
    this.refreshlist(false);
  }
}
