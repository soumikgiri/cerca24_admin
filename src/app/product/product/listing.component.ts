import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from '../../shared/services';
import * as moment from 'moment-timezone';

@Component({
  selector: 'product-listing',
  templateUrl: './listing.html'
})
export class ProductListingComponent implements OnInit {
  public items = [];
  public page: any = 1;
  public total: any = 0;
  public searchText: any = '';
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
    private productService: ProductService,
    private toasty: ToastyService,
    private authService: AuthService) {
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
      q: this.searchText,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`
    }, this.dateFilter);

    this.productService.search(params)
      .then(resp => {
        this.items = resp.data.items;
        this.total = resp.data.count;
        this.searchText = '';
      })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }

  remove(itemId: any, index: number) {
    if (window.confirm('Are you sure want to delete this item?')) {
      this.productService.remove(itemId)
        .then(() => {
          this.toasty.success('Item has been deleted!');
          this.items.splice(index, 1);
        })
        .catch((err) => this.toasty.error(err.data.message || 'Something went wrong, please try again!'));
    }
  }

  sortBy(field: string, type: string) {
    this.sortOption.sortBy = field;
    this.sortOption.sortType = type;
    this.query();
  }

  keyPress(event: any) {
    if (event.charCode === 13) {
      this.query();
    }
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
      access_token: this.accessToken,
      name: this.searchText
    };

    this.productService.export(params).then()
      .catch((err) => {
        let link = document.createElement('a');
        link.target = '_blank';
        link.download = 'file';
        link.href = err.url;
        link.click();
      });
  }
}
