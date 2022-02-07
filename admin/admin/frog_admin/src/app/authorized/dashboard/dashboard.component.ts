import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  search = '';
  searchTimeout;
  list;

  openedMerchant;

  constructor(
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.refreshlist()
  }

  refreshlist(){
    let options = {
      search: this.search
    };

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

  setInputValue(event, name){
    if(event.setval){
      this.openedMerchant[name] = event.value;
    }
  }

  setBundleValue(event, bundle, name){
    if(event.setval){
      bundle[name] = event.value;
    }
  }

  editBundle(bundle){
    bundle.edit = true;
  }

  saveNewBundle(item){
    item.edit = false;
  }

  openForm(content, item = null){
    this.openedMerchant = item || {
      inn: null,
      edrpou: null,
      fullName: null,
      shortName: null,
      legalAddress: null,
      director: null,
      activityType: null,
      url: null,
      brand: null,
      bundles: []
    };

    this.modalService.open(content);
  }

  deleteBundle(item){
    this.openedMerchant.bundles = this.openedMerchant.bundles.filter(_item => item !== _item);
  }

  addNewBundle(){
    if(!this.openedMerchant.bundles || !this.openedMerchant.bundles.length)
      this.openedMerchant.bundles = [];

    this.openedMerchant.bundles.push({
      bank_id: null,
      merchant_id: null,
      edit: true
    })
  }

  getBundleText(item){
    let retval = '';
    let retArr = [];
    if(item.bundles && item.bundles.length){
      for(let i=0;i<item.bundles.length;i++){
        let tmp = '(' + item.bundles[i].bank_id + ') - ' + item.bundles[i].merchant_id;
        retArr.push(tmp);
      }
    }

    if(retArr.length)
      retval = retArr.join(', ');

    return retval;
  }

  saveMerchant(){
    if(this.openedMerchant.bundles && this.openedMerchant.bundles.length)
      for(let i=0;i<this.openedMerchant.bundles.length;i++){
        delete this.openedMerchant.bundles[i].edit;
      }

  }
}
