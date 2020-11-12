import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'company-listing',
  templateUrl: './listing.html'
})
export class CompanyListingComponent implements OnInit {
  public items = [];
  public page: number = 1;
  public total: number = 0;
  public sortOption = {
    sortBy: 'createdAt',
    sortType: 'desc'
  };
  public searchFields: any = {
    activated: '',
    verified: '',
    email: '',
    name: ''
  };

  constructor(
    private router: Router,
    private toasty: ToastyService,
    private companyService: CompanyService
  ) {
  }

  ngOnInit() {
    this.query();
  }

  query() {
    this.companyService.search(Object.assign({
      page: this.page,
      take: 7,
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
