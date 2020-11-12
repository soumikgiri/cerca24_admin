import { Component, OnInit } from '@angular/core';
import { DeliveryRequestPayoutService } from '../../services/delivery-request.service';
import { ToastyService } from 'ng2-toasty';
import { CompanyService } from '../../../company/services';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'delivery-request-listing',
  templateUrl: './listing.html'
})
export class DeliveryListingComponent implements OnInit {
  public items = [];
  public page: Number = 1;
  public take: Number = 10;
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
  public loading: any = false;
  public stats: any;
  public company: any;
  public searching: any = false;
  public searchFailed: any = false;
  formatter = (x: { name: string }) => x.name;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.companyService.search({ name: term }).then((res) => {
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
    private payoutService: DeliveryRequestPayoutService,
    private toasty: ToastyService,
    private companyService: CompanyService
  ) {
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
      companyId: ''
    };
    if (this.company && this.company._id) {
      params.companyId = this.company._id;
    }
    this.payoutService.search(Object.assign(
      params, this.searchFields))
      .then(resp => {
        this.loading = false;
        this.items = resp.data.items;
        this.total = resp.data.count;
      })
      .catch(() => {
        this.toasty.error('Something went wrong, please try again!');
        this.loading = false;
      });
  }

  changeUTCDate() {
    if (this.dateFilter.startDate !== '' && this.dateFilter.toDate !== '') {
      const startUTCDate = new Date(this.dateFilter.startDate.year, this.dateFilter.startDate.month - 1, this.dateFilter.startDate.day);
      this.dateFilter.startDate = startUTCDate.toUTCString();
      const toUTCDate = new Date(this.dateFilter.toDate.year, this.dateFilter.toDate.month - 1, this.dateFilter.toDate.day);
      this.dateFilter.toDate = toUTCDate.toUTCString();
      if (startUTCDate > toUTCDate) {
        return 0;
      }
    }
  }

  queryStats() {
    if (this.changeUTCDate() === 0) {
      return this.toasty.error('Start date must be less than end date!');
    }
    const params = {
      startDate: this.dateFilter.startDate,
      toDate: this.dateFilter.toDate,
      companyId: ''
    };
    if (this.company) {
      params.companyId = this.company._id;
    }
    this.query();
    this.payoutService.stats(params)
      .then(resp => {
        this.stats = resp.data;
      }).catch(() => this.toasty.error('Can not find this company!'));
  }

  sortBy(field: string, type: string) {
    this.sortOption.sortBy = field;
    this.sortOption.sortType = type;
    this.query();
  }
}
