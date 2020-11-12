import { Component, OnInit } from '@angular/core';
import { ComplainService } from './service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from '../shared/services';
import * as moment from 'moment-timezone';

@Component({
  templateUrl: './views/list.html'
})
export class ComplaintListingComponent implements OnInit {
  public items = [];
  public page = 1;
  public total = 0;
  public dateFilter: any = {
    startDate: '',
    toDate: ''
  };
  public accessToken: any = '';

  constructor(
    private router: Router,
    private complainService: ComplainService,
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

    this.complainService.search({
      page: this.page,
      startDate: this.dateFilter.startDate,
      toDate: this.dateFilter.toDate
    })
      .then(resp => {
        this.items = resp.data.items;
        this.total = resp.data.count;
      })
      .catch(() => alert('Something went wrong, please try again!'));
  }

  remove(item: any, index: number) {
    if (window.confirm('Are you sure want to delete this complaints?')) {
      this.complainService.remove(item._id)
        .then(() => {
          this.toasty.success('Item has been deleted!');
          this.items.splice(index, 1);
        })
        .catch((err) => this.toasty.error(err.data.message || 'Something went wrong, please try again!'));
    }
  }


  swipe(url: string) {
    if (url) {
      let h = window.screen.availHeight;
      let w = window.screen.availWidth
      window.open(url, 'Image', 'width=' + w + ',height=' + h + ',resizable=1');
    } else {
      return this.toasty.error('Image is not available');
    }
  }

  exportCSV() {
    if (this.changeUTCDate() == 0) {
      return this.toasty.error('Start date must be less than end date!');
    }

    let params = {
      startDate: this.dateFilter.startDate,
      toDate: this.dateFilter.toDate,
      access_token: this.accessToken
    };

    this.complainService.export(params).then()
      .catch((err) => {
        let link = document.createElement('a');
        link.target = '_blank';
        link.download = 'file';
        link.href = err.url;
        link.click();
      });
  }
}
