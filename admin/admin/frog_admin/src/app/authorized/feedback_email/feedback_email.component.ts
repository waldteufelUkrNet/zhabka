import {Component, OnInit} from '@angular/core';
import {FeedbackService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-users',
  templateUrl: './feedback_email.component.html',
  styleUrls: ['./feedback_email.component.scss'],
  providers: [FeedbackService]
})
export class FeedbackEmailComponent implements OnInit {
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
    this.feedbackService.getEmailList({})
      .then((mList: any) => {
        this.list = mList;
      })
  }

  removeFeedbackEmail(id){

    let options = {
      id: id
    };

    this.feedbackService.removeFeedbackEmail(options)
      .then((mList: any) => {
        this.refreshlist();
      })
  }
 

  addFeedbackEmail(){
    if(!this.openedBrand || !this.openedBrand.email)
      return;

    let options = {
      email: this.openedBrand.email
    };

    this.feedbackService.addFeedbackEmail(options)
      .then((mList: any) => {
        this.refreshlist();
        this.modalService.dismissAll();
      })
  }

  formatDate(date){
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }

  setText(event){
    if(event.setval){
      this.openedBrand.email = event.value;
    }
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
      email: ''
    };

    this.modalService.open(content);
  }

  pageChanged(event){
    this.range.offset = (event - 1) * this.countShowInPage;
    this.refreshlist(false);
  }
}
