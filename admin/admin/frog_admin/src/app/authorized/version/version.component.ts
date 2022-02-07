import {Component, OnInit} from '@angular/core';
import {KeyboardUsersService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-users',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
  providers: [KeyboardUsersService]
})
export class VersionComponent implements OnInit {
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
    {name:"iOS", value:"IOS"},
    {name:"Android", value:"ANDROID"}
  ];

  countShowInPage = 10;
  range = {
    offset: 0,
    limit: this.countShowInPage
  };

  openedBrand;

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
    this.usersService.getVersionsList({})
      .then((mList: any) => {
        this.list = mList;
      })
  }

  saveVersion(){
    if(!this.openedBrand){
      return;
    }

    let options = {
      os: this.openedBrand.os.value,
      version: this.openedBrand.version
    };

    this.usersService.addVersion(options)
      .then((mList: any) => {
        this.refreshlist();
        this.modalService.dismissAll();
      })
  }

  removeVersion(id){

    let options = {
      id
    };

    this.usersService.removeVersion(options)
      .then((mList: any) => {
        this.refreshlist();
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

  setVersion(event){
    if(event.setval){
      this.openedBrand.version = event.value;
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

  openForm(content){

    this.openedBrand = {
      os: this.contact_types[0],
      version: ""
    };

    this.modalService.open(content);
  }

  pageChanged(event){
    this.range.offset = (event - 1) * this.countShowInPage;
    this.refreshlist(false);
  }
}
