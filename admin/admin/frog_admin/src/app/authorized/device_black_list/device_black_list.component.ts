import {Component, OnInit} from '@angular/core';
import {KeyboardUsersService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-device-black-list',
  templateUrl: './device_black_list.component.html',
  styleUrls: ['./device_black_list.component.scss'],
  providers: [KeyboardUsersService]
})
export class DeviceBlackListComponent implements OnInit {
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

  only_blocked = true;

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
      blocked: this.only_blocked || false
    };

    this.usersService.getDevicesBlackList(options)
      .then((mList: any) => {
        if(reinit) {
          this.countList = 0;
          this.range.offset = 0;
          this.usersService.getCountDevicesBlackList({search: options.search, blocked: this.only_blocked || false})
            .then(countData => {
              this.countList = countData;
            })
        }
        this.list = mList;
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

  getStatus(status){
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
    this.openedBrand = item || null;
    this.modalService.open(content);
    
  }

  pageChanged(event){
    this.range.offset = (event - 1) * this.countShowInPage;
    this.refreshlist(false);
  }
}
