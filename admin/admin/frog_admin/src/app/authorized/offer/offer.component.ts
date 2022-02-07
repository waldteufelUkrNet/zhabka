import {Component, OnInit} from '@angular/core';
import {KeyboardUsersService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-offers',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  providers: [KeyboardUsersService]
})
export class OfferComponent implements OnInit {
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
  
  offer_types = [
    {name:"Start offer", value:"start_offer_pdf"},
    {name:"P2p offer", value:"p2p_offer_pdf"}
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

    this.usersService.setOffer(this.openedBrand)
    .then((resItem: any) => {
      this.modalService.dismissAll();
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

  openForm(content, item){

    this.openedBrand = {
      name: item.name,
      value: null,
      key: item.value
    };

    this.usersService.getOffer(item)
      .then((resItem: any) => {
        console.log(resItem)
        this.openedBrand.value = resItem.value;
        this.modalService.open(content);
      })

   
  }

  pageChanged(event){
    this.range.offset = (event - 1) * this.countShowInPage;
    this.refreshlist(false);
  }
}
