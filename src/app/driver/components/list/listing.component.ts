import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { DriverService } from '../../driver.service';

@Component({
  selector: 'driver-listing',
  templateUrl: './listing.html'
})
export class ListingComponent implements OnInit {
  public items = [];
  public page: number = 1;
  public total: number = 0;
  public sortOption = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };
  public searchFields: any = {
    activated: '',
    emailVerified: '',
    email: '',
    name: ''
  };

  constructor(
    private router: Router,
    private toasty: ToastyService,
    private driverService: DriverService
  ) {
  }

  ngOnInit() {
    this.query();
  }

  query() {
    this.driverService.search(Object.assign({
      page: this.page,
      sort: `${this.sortOption.sortBy}`,
      sortType: `${this.sortOption.sortType}`
    }, this.searchFields))
      .then(resp => {
        this.items = resp.data.items;
        this.total = resp.data.count;
      })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }

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
}
