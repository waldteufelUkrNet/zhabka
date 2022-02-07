import {Component, OnInit} from '@angular/core';
import {FeedbackService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-users',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  providers: [FeedbackService]
})
export class FeedbackComponent implements OnInit {
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
    private feedbackService: FeedbackService,
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
    this.feedbackService.getList({})
      .then((mList: any) => {
        this.list = mList;
      })
  }

  sendSms(){
    if(!this.openedBrand){
      return;
    }

    let options = {
      feedback_id: this.openedBrand.feedback_id,
      text: this.openedBrand.text
    };

    this.feedbackService.sendSms(options)
      .then((mList: any) => {
        this.refreshlist();
        this.modalService.dismissAll();
      })
  }

  blockFeedback(id){

    let options = {
      feedback_id: id
    };

    this.feedbackService.blockOne(options)
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

  setText(event){
    if(event.setval){
      this.openedBrand.text = event.value;
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

  openSMSForm(content, item){

    this.openedBrand = {
      feedback_id: item.id,
      phone: item.phone,
      text: ""
    };

    this.modalService.open(content);
  }

  pageChanged(event){
    this.range.offset = (event - 1) * this.countShowInPage;
    this.refreshlist(false);
  }
}
