import {Component, OnInit} from '@angular/core';
import {KeyboardP2pPayoutService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-p2p-payout-logs',
  templateUrl: './p2p_payout_logs.component.html',
  styleUrls: ['./p2p_payout_logs.component.scss'],
  providers: [KeyboardP2pPayoutService]
})
export class P2pPayoutLogsComponent implements OnInit {
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
    private billsService: KeyboardP2pPayoutService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.bad_brands_only = false;
    this.refreshStatistic();
    this.show_fields_errors = false;
    this.field_errors = "";
  }


  refreshStatistic(){
    this.refresh = true;
    this.total = null;
    this.list = [];
    this.billsService.getLogs(this.filter)
      .then((data: any) => {
        let dataObject = {};
        let startDate = moment(this.filter.daterange.startDate);
        let endDate = moment(this.filter.daterange.endDate);
        let current = startDate;
        while(current <= endDate){
          dataObject[current.format('YYYY-MM-DD')] = {
            getCheck: 0,
            any: 0,
            total: 0
          };
          current = current.add(1, 'day');
        }
        this.list = data.list;
        this.total = data.total;
        this.refresh = false;
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
        this.refreshStatistic();
      }, 1000)
    }
  }

  formatDate(date){
    return moment(date).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss');
  }

  formatAction(data){
    switch (data) {
      case "GooglePay a2c Invoice":
        return "Выплата a2c GooglePay";
      case "ApplePay a2c Invoice":
        return "Выплата a2c ApplePay";
        break;
      case "GooglePay c2a PaymentCreate":
        return "Платеж c2a GooglePay (создание и подтверждение)";
        break;
      case "ApplePay c2a PaymentSale":
        return "Платеж c2a ApplePay (подтверждение)";
        break;
      case "ApplePay c2a PaymentCreate":
        return "Платеж c2a ApplePay (создание)";
        break;
      case "ApplePay c2a PaymentCancel":
        return "Возврат c2a ApplePay";
        break;
      case "GooglePay c2a PaymentCancel":
        return "Возврат c2a GooglePay";
        break;
      default:
        return "Неизвестная операция";
    }
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
    
    this.openedBrand = item || null;

    this.modalService.open(content);
  }

  pageChanged(event){
    this.range.offset = (event - 1) * this.countShowInPage;
    this.refreshStatistic();
  }
}
