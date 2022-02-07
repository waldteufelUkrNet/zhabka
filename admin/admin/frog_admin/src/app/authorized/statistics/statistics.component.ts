import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '../../shared';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [StatisticsService]
})
export class StatisticsComponent implements OnInit {
  search = '';
  searchTimeout;
  list;
  countList;

  countShowInPage = 10;
  range = {
    offset: 0,
    limit: this.countShowInPage
  };

  openedBrand;

  constructor(
    private statisticsService: StatisticsService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.refreshlist();
  }

  refreshlist(reinit = true){
    this.statisticsService.getList({})
      .then((mList: any) => {
        this.list = mList;
      })
  }
}
