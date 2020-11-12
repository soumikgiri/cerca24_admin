import { Component, OnInit } from '@angular/core';
import { SellerRequestPayoutService } from '../../services/seller-request.service';
import { ToastyService } from 'ng2-toasty';
import { ProductService } from '../../../product/services/product.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../shared/services';
import * as moment from 'moment-timezone';

@Component({
  selector: 'seller-request-listing',
  templateUrl: './listing.html'
})
export class SellerListingComponent implements OnInit {
  public items = [];
  public page: Number = 1;
  public take: Number = 7;
  public total: Number = 0;
  public searchFields: any = {
  };
  public sortOption = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };
  public dateFilter: any = {
    startDate: '',
    toDate: ''
  };
  public accessToken: any = '';
  public loading: boolean = false;
  public stats: any;
  public seller: any;
  public searching: any = false;
  public searchFailed: any = false;

  formatter = (x: { name: string }) => x.name;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.productService.findSeller({ name: term }).then((res) => {
          if (res) {
            this.searchFailed = false;
            this.searching = false;
            return res.data.items;
          }
          this.searchFailed = true;
          this.searching = false;
          return of([]);
        })
      )
    )

  constructor(
    private payoutService: SellerRequestPayoutService,
    private toasty: ToastyService,
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.accessToken = this.authService.getAccessToken();
  }

  ngOnInit() {
    this.query();
    this.queryStats();
  }

  query() {
    this.loading = true;
    const params = {
      page: this.page,
      take: this.take,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`,
      shopId: ''
    };
    if (this.seller && this.seller._id) {
      params.shopId = this.seller._id;
    }
    this.payoutService.search(Object.assign(params, this.searchFields))
      .then(resp => {
        this.loading = false;
        this.items = resp.data.items;
        this.total = resp.data.count;
      })
      .catch(() => {
        this.loading = false;
        this.toasty.error('Something went wrong, please try again!');
      });
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

  queryStats() {
    if (this.changeUTCDate() === 0) {
      return this.toasty.error('Start date must be less than end date!');
    }
    let params = Object.assign({
      shopId: ''
    }, this.dateFilter);
    if (this.seller) {
      params.shopId = this.seller._id;
    }
    this.query();
    this.payoutService.stats(params)
      .then(resp => { this.stats = resp.data; });
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
      access_token: this.accessToken,
      shopId: ''
    };
    if (this.seller && this.seller._id) {
      params.shopId = this.seller._id;
    }
    this.payoutService.export(params).then()
      .catch((err) => {
        let link = document.createElement('a');
        link.target = '_blank';
        link.download = 'file';
        link.href = err.url;
        link.click();
      });
  }
}
