import { Component, OnInit, Input } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../shared/services';
import * as moment from 'moment-timezone';

@Component({
  selector: 'shops-listing',
  templateUrl: './listing.html'
})
export class ShopListingComponent implements OnInit {
  public items = [];
  public page: number = 1;
  public total: number = 0;
  public take: number = 10;
  public searchFields: any = {
    activated: '',
    featured: '',
    verified: '',
    email: '',
    name: ''
  };
  public sortOption = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };
  public owner: any = '';
  public searching: boolean = false;
  public searchFailed: boolean = false;
  public dateFilter: any = {
    startDate: '',
    toDate: ''
  };
  public accessToken: any = '';

  formatter = (x: {
    name: string
  }) => x.name;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.shopService.findOwner({
          name: term
        }).then((res) => {
          if (res) {
            this.searchFailed = false;
            this.searching = false;
            return res.data.items;
          }
          this.searchFailed = false;
          this.searching = false;
          return of([])
        })
      )
    );

  constructor(
    private router: Router,
    private shopService: ShopService,
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

    if (this.owner) {
      if (this.owner._id) {
        this.searchFields.ownerId = this.owner._id;
      } else {
        return this.toasty.error('Can not find this owner, please enter another ownner');
      }
    }
    let params = Object.assign({
      page: this.page,
      take: this.take,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`
    }, this.searchFields, this.dateFilter);

    this.shopService.search(params)
      .then(resp => {
        this.items = resp.data.items;
        this.total = resp.data.count;
        this.searchFields = {};
      })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }

  // remove(itemId: any, index: number) {
  //   if (window.confirm('Are you sure want to delete this item?')) {
  //     this.shopService.remove(itemId)
  //       .then(() => {
  //         this.toasty.success('Item has been deleted!');
  //         this.items.splice(index, 1);
  //       })
  //       .catch((err) => this.toasty.error(err.data.message || 'Something went wrong, please try again!'));
  //   }
  // }

  keyPress(event: any) {
    if (event.charCode === 13) {
      this.query();
    }
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

    let params = Object.assign({
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`,
      startDate: this.dateFilter.startDate,
      toDate: this.dateFilter.toDate,
      access_token: this.accessToken
    }, this.searchFields);

    this.shopService.export(params).then()
      .catch((err) => {
        let link = document.createElement('a');
        link.target = '_blank';
        link.download = 'file';
        link.href = err.url;
        link.click();
      });
  }
}
