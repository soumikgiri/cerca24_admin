import { Component, OnInit, Input } from '@angular/core';
import { RefundService } from '../../refund.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services';
import { ToastyService } from 'ng2-toasty';
import * as moment from 'moment-timezone';

@Component({
  selector: 'refund-listing',
  templateUrl: './listing.html'
})
export class ListingComponent implements OnInit {
  public items = [];
  public page: Number = 1;
  public take: Number = 10;
  public total: Number = 0;
  public searchFields: any = {};
  public sortOption = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };
  public dateFilter: any = {
    startDate: '',
    toDate: ''
  };
  public accessToken: any = '';

  constructor(
    private router: Router,
    private refundService: RefundService,
    private toasty: ToastyService,
    private authService: AuthService
  ) {
    this.accessToken = this.authService.getAccessToken();
  }

  ngOnInit() {
    this.query();
  }

  changeUTCDate() {
    if (this.dateFilter.startDate !== '' && this.dateFilter.toDate !== '') {
      let startUTCDate = new moment().utcOffset(0);
      startUTCDate.year(this.dateFilter.startDate.year)
        .month(this.dateFilter.startDate.month - 1)
        .date(this.dateFilter.startDate.day);
      this.dateFilter.startDate = startUTCDate.startOf('day').toISOString();

      let toUTCDate = new moment().utcOffset(0);
      toUTCDate.year(this.dateFilter.toDate.year)
        .month(this.dateFilter.toDate.month - 1)
        .date(this.dateFilter.toDate.day);
      this.dateFilter.toDate = toUTCDate.startOf('day').toISOString();

      if (startUTCDate > toUTCDate) {
        return 0;
      }
    }
  }

  query() {
    if (this.changeUTCDate() === 0) {
      return this.toasty.error('Start date must be less than end date!');
    }
    let params = Object.assign({
      page: this.page,
      take: this.take,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`
    }, this.searchFields, this.dateFilter);

    this.refundService.search(params).then(resp => {
      this.items = resp.data.items;
      this.total = resp.data.count;
    }).catch(() => this.toasty.error('Something went wrong, please try again!'));
  }

  sortBy(field: string, type: string) {
    this.sortOption.sortBy = field;
    this.sortOption.sortType = type;
    this.query();
  }

  exportCSV() {
    if (this.changeUTCDate() == 0) {
      return this.toasty.error('Start date must be less than end date!');
    }

    let params = {
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`,
      startDate: this.dateFilter.startDate,
      toDate: this.dateFilter.toDate,
      access_token: this.accessToken
    };

    this.refundService.export(params).then()
      .catch((err) => {
        let link = document.createElement('a');
        link.target = '_blank';
        link.download = 'file';
        link.href = err.url;
        link.click();
      });
  }

}
